import { GuestRole, PrismaClient, UserRole, UserStatus } from '#prisma'
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { IPaginationResult, isUndefined } from '@repo/shared'
import * as cookieParser from 'cookie-parser'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import * as request from 'supertest'
import { v4 as uuid } from 'uuid'

import { AppModule } from '#/app/app.module'
import { PrismaService } from '#/core/prisma.service'
import { IUserModel } from '#/user/domain'

import { RegisterGuestDto } from '#/svadba/api'
import { IGuestModel } from '#/svadba/domain'

import { mockGuestsWithUsers } from './mocks/guests.mock'
import { mockUsers } from './mocks/users.mock'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Guest Controller (e2e)', () => {
  const endpoint = '/guests'

  let app: INestApplication
  let prisma: DeepMockProxy<PrismaClient>

  let adminAuthCookie: any
  let adminUser: IUserModel
  let publicAuthCookie: any
  let publicUser: IUserModel

  beforeAll(async () => {
    prisma = mockDeep<PrismaClient>()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile()

    app = moduleFixture.createNestApplication()

    // Add cookie parser middleware
    app.use(cookieParser(process.env.COOKIE_SECRET))

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector))
    )

    await app.init()

    prisma.user.findUnique.mockImplementation((args: any): any => {
      return Promise.resolve(
        mockUsers.find((user) => {
          if (args.where.login) {
            return user.login === args.where.login
          }

          if (args.where.id) {
            return user.id === args.where.id
          }

          return undefined
        })
      )
    })

    prisma.guest.findMany.mockImplementation((args: any): any => {
      if (args.where) {
        return Promise.resolve(
          mockGuestsWithUsers.filter((u) => {
            if (args.where.side) {
              return u.side === args.where.side.equals
            }

            if (args.where.guestRole) {
              return u.role === args.where.role.equals
            }

            if (args.where.user.status) {
              return u.user!.status === args.where.user.status.equals
            }

            if (args.where.user.role) {
              return u.user!.role === args.where.user.role.equals
            }

            if (args.where.user.login) {
              return u.user!.login.includes(args.where.user.login.contains)
            }

            if (args.where.user.name) {
              return u.user!.name!.includes(args.where.user.name.contains)
            }

            if (!isUndefined(args.where.isTelegramVerified)) {
              return (
                String(u.user!.isTelegramVerified) ===
                String(args.where.isTelegramVerified)
              )
            }

            return true
          })
        )
      }

      if (args.take && args.skip) {
        return Promise.resolve(mockGuestsWithUsers.slice(args.skip, args.take))
      }

      return Promise.resolve(mockGuestsWithUsers)
    })

    prisma.guest.count.mockResolvedValue(mockGuestsWithUsers.length)

    // prisma.user.update.mockImplementation((args: any): any => {
    //   const user = mockUsers.find((u) => u.id === args.where.id)
    //   if (!user) return Promise.reject(new Error('User not found'))

    //   const updatedUser = { ...user, ...args.data }
    //   mockUsers[mockUsers.indexOf(user)] = updatedUser
    //   return Promise.resolve(updatedUser)
    // })

    prisma.user.delete.mockImplementation((args: any): any => {
      const userIndex = mockUsers.findIndex((u) => u.id === args.where.id)
      if (userIndex === -1) return Promise.reject(new Error('User not found'))

      const deletedUser = mockUsers[userIndex]
      mockUsers.splice(userIndex, 1)
      return Promise.resolve(deletedUser)
    })

    adminUser = mockUsers.find((u) => u.role === UserRole.ADMIN)!
    publicUser = mockUsers.find((u) => u.role === UserRole.PUBLIC)!

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        login: adminUser.login,
        password: 'testpassword',
      })
      .then((res) => {
        adminAuthCookie = res.header['set-cookie']
      })

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        login: publicUser.login,
        password: 'testpassword',
      })
      .then((res) => {
        publicAuthCookie = res.header['set-cookie']
      })
  })

  beforeEach(() => {
    prisma.user.create.mockImplementation((args: any): any => {
      const newUser: IUserModel = {
        id: uuid(),
        password: args.data.password,
        login: args.data.login,
        isTelegramVerified: false,
        credentials: [],
        name: args.data.name,
        role: UserRole.PUBLIC,
        telegramId: null,
        status: UserStatus.CREATED,
        createdAt: new Date(),
        guestId: null,
      }
      mockUsers.push(newUser)
      return Promise.resolve(newUser)
    })

    prisma.guest.create.mockImplementation((args: any): any => {
      const guestId = args.data.id ?? uuid()
      const newGuest: IGuestModel = {
        id: guestId,
        answers: args.data.answers ?? {},
        role: args.data.role ?? GuestRole.GUEST,
        side: args.data.side,
        updatedAt: new Date(),
        createdAt: new Date(),
        userId: args.data.userId ?? null,
        user: null,
      }

      return Promise.resolve(newGuest)
    })
  })

  describe('GET /guests', () => {
    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer()).get(endpoint).expect(401)
    })

    it('должен вернуть список гостей', async () => {
      const response: IPaginationResult<IGuestModel> = {
        data: mockGuestsWithUsers,
        meta: {
          currentPage: 1,
          lastPage: 1,
          nextPage: null,
          prevPage: null,
          totalPerPage: 10,
          total: mockGuestsWithUsers.length,
        },
      }

      await request(app.getHttpServer())
        .get(endpoint)
        .set('Cookie', publicAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeInstanceOf(Array)
          expect(res.body.meta).toStrictEqual(response.meta)
        })
    })

    it('должен вернуть список гостей с пагинацией', async () => {
      const response: IPaginationResult<IGuestModel> = {
        data: mockGuestsWithUsers,
        meta: {
          currentPage: 2,
          lastPage: 2,
          nextPage: null,
          prevPage: 1,
          totalPerPage: 1,
          total: mockGuestsWithUsers.length,
        },
      }

      await request(app.getHttpServer())
        .get(`${endpoint}?size=1&page=2`)
        .set('Cookie', publicAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeInstanceOf(Array)
          expect(res.body.meta).toStrictEqual(response.meta)
        })
    })

    it('должен вернуть список гостей с параметром', async () => {
      await request(app.getHttpServer())
        .get(`${endpoint}?login=test_admin`)
        .set('Cookie', publicAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
        })
    })
  })

  describe('POST /guests', () => {
    const newGuest: RegisterGuestDto = {
      login: 'test5',
      name: 'Test 5',
      password: 'testpass',
      side: 'BRIDE',
    }

    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer()).post(endpoint).expect(401)
    })

    it('должен вернуть 403 код, если пользователь не администратор', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .set('Cookie', publicAuthCookie)
        .send(newGuest)
        .expect(403)
    })

    it('должен вернуть зарегистрированного гостя', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .set('Cookie', adminAuthCookie)
        .send(newGuest)
        .expect(201)
        .expect((res) => {
          expect(res.body.role).toBe(GuestRole.GUEST) // Default role
        })
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
