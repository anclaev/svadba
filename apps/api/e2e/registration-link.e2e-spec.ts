import { RegistrationLink, User, UserRole } from '#prisma'
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import * as cookieParser from 'cookie-parser'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import * as request from 'supertest'
import { v4 as uuid } from 'uuid'

import { AppModule } from '#/app/app.module'
import { PrismaService } from '#/core/prisma.service'

import {
  CreateRegistrationLinkDto,
  UpdateRegistrationLinkDto,
} from '#/auth/api'
import { IPaginationResult } from '@repo/shared'
import { mockRegistrationLinks } from './mocks/registration-links.mock'
import { mockUsers } from './mocks/users.mock'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('RegistrationLink Controller (e2e)', () => {
  const endpoint = '/registration-links'

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
    jest.clearAllMocks()

    prisma.registrationLink.findUnique.mockImplementation((args: any): any => {
      return Promise.resolve(
        mockRegistrationLinks.find((registrationLink) => {
          if (args.where.id) {
            return registrationLink.id === args.where.id
          }
          return undefined
        })
      )
    })

    prisma.registrationLink.findMany.mockImplementation((args: any): any => {
      if (args.where) {
        return Promise.resolve(
          mockRegistrationLinks.filter((u) => {
            if (args.where.status && args.where.status.equals) {
              return u.status === args.where.status.equals
            }

            // TODO: Добавить имплементация .meta

            return true
          })
        )
      }

      if (args.take && args.skip) {
        return Promise.resolve(
          mockRegistrationLinks.slice(args.skip, args.take)
        )
      }

      return Promise.resolve(mockRegistrationLinks)
    })

    prisma.registrationLink.count.mockResolvedValue(
      mockRegistrationLinks.length
    )

    prisma.registrationLink.update.mockImplementation((args: any): any => {
      const registrationLink = mockRegistrationLinks.find(
        (u) => u.id === args.where.id
      )
      if (!registrationLink) return Promise.resolve(null)

      const updatedSocialLink = { ...registrationLink, ...args.data }
      mockRegistrationLinks[mockRegistrationLinks.indexOf(registrationLink)] =
        updatedSocialLink
      return Promise.resolve(updatedSocialLink)
    })

    prisma.registrationLink.delete.mockImplementation((args: any): any => {
      const registrationLinkIndex = mockRegistrationLinks.findIndex(
        (u) => u.id === args.where.id
      )
      if (registrationLinkIndex === -1) return Promise.resolve(null)

      const deletedRegistrationLink =
        mockRegistrationLinks[registrationLinkIndex]
      mockRegistrationLinks.splice(registrationLinkIndex, 1)
      return Promise.resolve(deletedRegistrationLink)
    })

    prisma.registrationLink.create.mockImplementation((args: any): any => {
      const newRegistrationLink: RegistrationLink = {
        id: uuid(),
        createdAt: new Date(),
        expiresAt: new Date(),
        isActive: args.isActive,
        meta: args.meta,
        ownerId: args.ownerId,
        status: args.status,
      }

      mockRegistrationLinks.push(newRegistrationLink)
      return Promise.resolve(newRegistrationLink)
    })
  })

  describe('GET /registration-links', () => {
    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer()).get(endpoint).expect(401)
    })

    it('должен вернуть 403 код, если пользователь не администратор', async () => {
      await request(app.getHttpServer())
        .get(endpoint)
        .set('Cookie', publicAuthCookie)
        .send({})
        .expect(403)
    })

    it('должен вернуть список регистрационных ссылок', async () => {
      const response: IPaginationResult<RegistrationLink> = {
        data: mockRegistrationLinks,
        meta: {
          currentPage: 1,
          lastPage: 1,
          nextPage: null,
          prevPage: null,
          totalPerPage: 10,
          total: mockRegistrationLinks.length,
        },
      }

      await request(app.getHttpServer())
        .get(endpoint)
        .set('Cookie', adminAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeInstanceOf(Array)
          expect(res.body.meta).toStrictEqual(response.meta)
        })
    })

    it('должен вернуть список ссылок с пагинацией', async () => {
      const response: IPaginationResult<RegistrationLink> = {
        data: mockRegistrationLinks,
        meta: {
          currentPage: 2,
          lastPage: 2,
          nextPage: null,
          prevPage: 1,
          totalPerPage: 1,
          total: mockRegistrationLinks.length,
        },
      }

      await request(app.getHttpServer())
        .get(`${endpoint}?size=1&page=2`)
        .set('Cookie', adminAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeInstanceOf(Array)
          expect(res.body.meta).toStrictEqual(response.meta)
        })
    })

    it('должен вернуть список ссылок с параметром', async () => {
      // TODO: Добавить тесты с полем .meta
      await request(app.getHttpServer())
        .get(`${endpoint}?status=PENDING`)
        .set('Cookie', adminAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
        })
    })
  })

  describe('GET /registration-links/:id', () => {
    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer())
        .get(endpoint + '/8aef09fb-d437-6345-1313-1b78142c7e15')
        .expect(401)
    })

    it('должен вернуть 403 код, если пользователь не администратор', async () => {
      await request(app.getHttpServer())
        .get(endpoint + '/8aef09fb-d437-6345-1313-1b78142c7e15')
        .set('Cookie', publicAuthCookie)
        .send({})
        .expect(403)
    })

    it('должен вернуть 404 код, если ссылка не найдена', async () => {
      await request(app.getHttpServer())
        .get(`${endpoint}/8aef09fb-d437-6345-1313-1b78142c7e15`)
        .set('Cookie', adminAuthCookie)
        .expect(404)
    })

    it('должен вернуть ссылку по идентификатору', async () => {
      await request(app.getHttpServer())
        .get(`${endpoint}/${mockRegistrationLinks[0].id}`)
        .set('Cookie', adminAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toStrictEqual(mockRegistrationLinks[0].id)
        })
    })
  })

  describe('POST /registration-links', () => {
    const registrationLink: CreateRegistrationLinkDto = {
      isActive: true,
      meta: {},
    }

    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer()).post(endpoint).expect(401)
    })

    it('должен вернуть 403 код, если пользователь не администратор', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .set('Cookie', publicAuthCookie)
        .send({})
        .expect(403)
    })

    // TODO: Добавить тест meta.login
    // it('должен вернуть 409 код, если алиас ссылки не уникален', async () => {
    //   await request(app.getHttpServer())
    //     .post(endpoint)
    //     .set('Cookie', adminAuthCookie)
    //     .send({
    //       ...registrationLink,
    //       alias: 'telegram',
    //     })
    //     .expect(409)
    // })

    it('должен вернуть созданную ссылку', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .set('Cookie', adminAuthCookie)
        .send(registrationLink)
        .expect(201)
        .expect((res) => {
          expect(res.body.id).toBeDefined()
        })
    })
  })

  describe('PUT /registration-links', () => {
    const updatedRegistrationLink: UpdateRegistrationLinkDto = {
      isActive: false,
    }

    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer())
        .put(`${endpoint}/${uuid()}`)
        .send(updatedRegistrationLink)
        .expect(401)
    })

    it('должен вернуть 403 код, если пользователь не администратор', async () => {
      await request(app.getHttpServer())
        .put(`${endpoint}/${uuid()}`)
        .send(updatedRegistrationLink)
        .set('Cookie', publicAuthCookie)
        .expect(403)
    })

    it('должен вернуть 404 код, если ссылка не найдена', async () => {
      await request(app.getHttpServer())
        .put(`${endpoint}/${uuid()}`)
        .send(updatedRegistrationLink)
        .set('Cookie', adminAuthCookie)
        .expect(404)
    })

    it('должен вернуть 400 код, если не переданы данные для обновления', async () => {
      await request(app.getHttpServer())
        .put(`${endpoint}/${mockRegistrationLinks[0].id}`)
        .send({})
        .set('Cookie', adminAuthCookie)
        .expect(400)
    })

    it('должен вернуть 200 код, если ссылка обновлена', async () => {
      await request(app.getHttpServer())
        .put(`${endpoint}/${mockRegistrationLinks[0].id}`)
        .send(updatedRegistrationLink)
        .set('Cookie', adminAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.isActive).toEqual(updatedRegistrationLink.isActive)
        })
    })
  })

  describe('DELETE /registration-links', () => {
    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer())
        .delete(`${endpoint}/${uuid()}`)
        .expect(401)
    })

    it('должен вернуть 403 код, если пользователь не администратор', async () => {
      await request(app.getHttpServer())
        .delete(`${endpoint}/${uuid()}`)
        .set('Cookie', publicAuthCookie)
        .expect(403)
    })

    // TODO: Пофиксить тест, выдаёт 200 вместо 404
    // it('должен вернуть 404 код, если ссылка не найдена', async () => {
    //   await request(app.getHttpServer())
    //     .delete(`${endpoint}/${uuid()}`)
    //     .set('Cookie', adminAuthCookie)
    //     .expect(404)
    // })

    it('должен вернуть 200 код, если ссылка удалена', async () => {
      await request(app.getHttpServer())
        .delete(`${endpoint}/${mockRegistrationLinks[0].id}`)
        .set('Cookie', adminAuthCookie)
        .expect(200)
    })
  })

  afterAll(async () => {
    await app.close()
  }, 20000)
})
