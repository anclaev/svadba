import { PrismaClient, User, UserRole, UserStatus } from '#prisma'
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import * as cookieParser from 'cookie-parser'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import * as request from 'supertest'
import { v4 as uuid } from 'uuid'

import { AppModule } from '#/app/app.module'
import { SignUpDto } from '#/auth/api'
import { PrismaService } from '#/core/prisma.service'

import { mockUsers } from './mocks/users.mock'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Auth Controller (e2e)', () => {
  let app: INestApplication
  let prisma: DeepMockProxy<PrismaClient>

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

    publicUser = mockUsers.find((u) => u.role === UserRole.PUBLIC)!

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

  describe('GET /auth/profile', () => {
    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer()).get('/auth/profile').expect(401)
    })

    it('должен вернуть аутентифицированного пользователя', async () => {
      await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Cookie', publicAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.login).toBe(publicUser.login)
          expect(res.body.password).toBeUndefined()
        })
    })
  })

  describe('POST /auth/sign-up', () => {
    const credentials: SignUpDto = {
      login: 'test_public',
      password: 'testpassword',
      name: 'Test Public',
    }

    it('должен вернуть 409 код, если логин уже занят', async () => {
      await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(credentials)
        .expect(409)
    })

    it('должен вернуть пользователя, если регистрация прошла', async () => {
      await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({ ...credentials, login: 'test_public_new' })
        .expect(200)
        .expect((res) => {
          expect(res.body.user.login).toBe('test_public_new')
          expect(res.body.user.role).toBe(UserRole.PUBLIC)
          expect(res.body.user.status).toBe(UserStatus.CREATED)
          expect(res.body.user.password).toBeUndefined()
        })
    })
  })

  describe('GET /auth/refresh', () => {
    it('должен вернуть 401 код, если токен обновления не валиден', async () => {
      await request(app.getHttpServer())
        .get('/auth/refresh')
        .set('Cookie', [publicAuthCookie[0]])
        .expect(401)
    })

    it('должен вернуть пользователя и установить куки, если токены обновились', async () => {
      await request(app.getHttpServer())
        .get('/auth/refresh')
        .set('Cookie', publicAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.user).toBeDefined()
          expect(res.header['set-cookie']).toHaveLength(2)
        })
    })
  })

  describe('POST /auth/logout', () => {
    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer()).post('/auth/logout').expect(401)
    })

    it('должен очистить куки, если пользователь вышел', async () => {
      await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Cookie', publicAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.header['set-cookie']).toHaveLength(2)
        })
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
