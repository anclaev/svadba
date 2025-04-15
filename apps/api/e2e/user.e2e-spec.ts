import { PrismaClient, User, UserRole, UserStatus } from '#prisma'
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import * as cookieParser from 'cookie-parser'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import * as request from 'supertest'
import { v4 as uuid } from 'uuid'

import { AppModule } from '#/app/app.module'
import { PrismaService } from '#/core/prisma.service'
import { CreateUserDto } from '#/user/api'

import { mockUsers } from './mocks/users.mock'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('User Controller (e2e)', () => {
  let app: INestApplication
  let prisma: DeepMockProxy<PrismaClient>

  let adminAuthCookie: any
  let adminUser: User
  let publicAuthCookie: any
  let publicUser: User

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

    prisma.user.findMany.mockResolvedValue(mockUsers)

    prisma.user.update.mockImplementation((args: any): any => {
      const user = mockUsers.find((u) => u.id === args.where.id)
      if (!user) return Promise.reject(new Error('User not found'))

      const updatedUser = { ...user, ...args.data }
      mockUsers[mockUsers.indexOf(user)] = updatedUser
      return Promise.resolve(updatedUser)
    })

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
      const newUser: User = {
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
      }
      mockUsers.push(newUser)
      return Promise.resolve(newUser)
    })
  })

  describe('POST /users', () => {
    const newUser: CreateUserDto = {
      login: 'test5',
      name: 'Test 5',
      password: 'testpass',
    }

    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer()).post('/users').expect(401)
    })

    it('должен вернуть 403 код, если пользователь не администратор', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .set('Cookie', publicAuthCookie)
        .send(newUser)
        .expect(403)
    })

    it('должен вернуть созданного пользователя', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .set('Cookie', adminAuthCookie)
        .send(newUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.login).toBe(newUser.login)
          expect(res.body.role).toBe(UserRole.PUBLIC) // Default role
          expect(res.body.password).toBeUndefined() // Password should not be returned
        })
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
