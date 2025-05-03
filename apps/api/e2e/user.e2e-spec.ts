import { PrismaClient, User as PrismaUser, UserRole, UserStatus } from '#prisma'
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import * as cookieParser from 'cookie-parser'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import * as request from 'supertest'
import { v4 as uuid } from 'uuid'

import { AppModule } from '#/app/app.module'
import { PrismaService } from '#/core/prisma.service'
import { CreateUserDto, UpdateUserDto } from '#/user/api'
import { IUserModel } from '#/user/domain'

import { mockUsers } from './mocks/users.mock'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('User Controller (e2e)', () => {
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

    const mockFindManyUsers = mockUsers.map((user) => ({
      ...user,
      guestId: user.guestId,
    }))

    prisma.user.findMany.mockResolvedValue(mockFindManyUsers as any)

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

  describe('PUT /users/:id', () => {
    const mockUserId = mockUsers[0].id

    const validUpdateUserDto: UpdateUserDto = {
      name: 'Updated Name',
    }

    const mockPrismaUser: PrismaUser = {
      id: mockUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
      credentials: [],
      login: 'login',
      name: 'name',
      password: '1d13d13d13d',
      role: 'ADMIN',
      status: 'BLOCKED',
      telegramId: null,
      isTelegramVerified: false,
    }

    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer())
        .put('/users/' + mockUserId)
        .send(validUpdateUserDto)
        .expect(401)
    })

    it('должен вернуть 403 код, если пользователь не администратор', async () => {
      await request(app.getHttpServer())
        .put('/users/' + mockUserId)
        .send(validUpdateUserDto)
        .set('Cookie', publicAuthCookie)
        .expect(403)
    })

    it('должен успешно обновлять пользователя', async () => {
      prisma.user.update.mockResolvedValue(mockPrismaUser)

      await request(app.getHttpServer())
        .put(`/users/${mockUserId}`)
        .send(validUpdateUserDto)
        .set('Cookie', adminAuthCookie)
        .expect(200)
    })

    it('должен возвращать 400 код, если нет полей для обновления', async () => {
      const emptyDto = {}

      const response = await request(app.getHttpServer())
        .put(`/users/${mockUserId}`)
        .send(emptyDto)
        .set('Cookie', adminAuthCookie)
        .expect(400)

      expect(response.body.message).toBe(
        'Отсутствуют поля для изменения пользователя.'
      )
    })

    it('должен возвращать 409 код, если guestId занят', async () => {
      prisma.user.findFirst.mockResolvedValue(mockPrismaUser)

      const response = await request(app.getHttpServer())
        .put(`/users/${mockUserId}`)
        .send({ ...validUpdateUserDto, guestId: uuid() })
        .set('Cookie', adminAuthCookie)
        .expect(409)

      expect(response.body.message).toBe(
        'Пользователь с данным ID гостя уже существует.'
      )
    })

    it('должен возвращать 409 код, если логин занят', async () => {
      prisma.user.findUnique.mockResolvedValue(mockPrismaUser)

      const response = await request(app.getHttpServer())
        .put(`/users/${mockUserId}`)
        .send({ ...validUpdateUserDto, login: 'existing-login' })
        .set('Cookie', adminAuthCookie)
        .expect(409)

      expect(response.body.message).toBe(
        'Пользователь с данным логином уже существует.'
      )
    })

    it('должен возвращать 409 код, если telegramId занят', async () => {
      prisma.user.findUnique.mockResolvedValue(mockPrismaUser)

      const response = await request(app.getHttpServer())
        .put(`/users/${mockUserId}`)
        .send({ ...validUpdateUserDto, telegramId: 131313 })
        .set('Cookie', adminAuthCookie)
        .expect(409)

      expect(response.body.message).toBe(
        'Пользователь с данным telegramId уже существует.'
      )
    })
  })

  describe('DELETE /users/:id', () => {
    const mockUserId = mockUsers[0].id

    const mockPrismaUser: PrismaUser = {
      id: mockUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
      credentials: [],
      login: 'login',
      name: 'name',
      password: '1d13d13d13d',
      role: 'ADMIN',
      status: 'BLOCKED',
      telegramId: null,
      isTelegramVerified: false,
    }

    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer())
        .delete('/users/' + mockUserId)
        .expect(401)
    })

    it('должен вернуть 404 код, если пользователь не найден', async () => {
      await request(app.getHttpServer())
        .delete('/users/' + uuid())
        .set('Cookie', adminAuthCookie)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toStrictEqual('Пользователь не найден.')
        })
    })

    it('должен вернуть true', async () => {
      prisma.user.delete.mockResolvedValue(mockPrismaUser)

      await request(app.getHttpServer())
        .delete('/users/' + mockUserId)
        .set('Cookie', adminAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body).toStrictEqual({})
        })
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
