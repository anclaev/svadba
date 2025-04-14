import { PrismaClient, SocialLink, User, UserRole } from '#prisma'
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import * as cookieParser from 'cookie-parser'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import * as request from 'supertest'
import { v4 as uuid } from 'uuid'

import { AppModule } from '#/app/app.module'
import { PrismaService } from '#/core/prisma.service'
import { CreateSocialLinkDto, UpdateSocialLinkDto } from '#/social-link/api'
import { IPaginationResult } from '@repo/shared'

import { mockSocialLinks } from './mocks/social-links.mock'
import { mockUsers } from './mocks/users.mock'

describe('SocialLink Controller (e2e)', () => {
  const endpoint = '/social-links'

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

    prisma.socialLink.findUnique.mockImplementation((args: any): any => {
      return Promise.resolve(
        mockSocialLinks.find((socialLink) => {
          if (args.where.alias) {
            return socialLink.alias === args.where.alias
          }

          if (args.where.creatorId) {
            return socialLink.creatorId === args.where.creatorId
          }

          if (args.where.id) {
            return socialLink.id === args.where.id
          }

          return undefined
        })
      )
    })

    prisma.socialLink.findMany.mockImplementation((args: any): any => {
      if (args.where) {
        return Promise.resolve(
          mockSocialLinks.filter((u) => {
            if (args.where.alias) {
              return u.alias.includes(args.where.alias.contains)
            }

            return true
          })
        )
      }

      if (args.take && args.skip) {
        return Promise.resolve(mockSocialLinks.slice(args.skip, args.take))
      }

      return Promise.resolve(mockSocialLinks)
    })

    prisma.socialLink.count.mockResolvedValue(mockSocialLinks.length)

    prisma.socialLink.update.mockImplementation((args: any): any => {
      const socialLink = mockSocialLinks.find((u) => u.id === args.where.id)
      if (!socialLink) return Promise.resolve(null)

      const updatedSocialLink = { ...socialLink, ...args.data }
      mockSocialLinks[mockSocialLinks.indexOf(socialLink)] = updatedSocialLink
      return Promise.resolve(updatedSocialLink)
    })

    prisma.socialLink.delete.mockImplementation((args: any): any => {
      const socialLinkIndex = mockSocialLinks.findIndex(
        (u) => u.id === args.where.id
      )
      if (socialLinkIndex === -1) return Promise.resolve(null)

      const deletedSocialLink = mockSocialLinks[socialLinkIndex]
      mockSocialLinks.splice(socialLinkIndex, 1)
      return Promise.resolve(deletedSocialLink)
    })

    prisma.socialLink.create.mockImplementation((args: any): any => {
      const newSocialLink: SocialLink = {
        id: uuid(),
        alias: args.data.alias,
        creatorId: args.data.creatorId!,
        href: args.data.href,
        title: args.data.title,
        icon: args.data.icon ?? null,
        createdAt: new Date(),
      }

      mockSocialLinks.push(newSocialLink)
      return Promise.resolve(newSocialLink)
    })
  })

  describe('GET /social-links', () => {
    it('должен вернуть список ссылок', async () => {
      const response: IPaginationResult<SocialLink> = {
        data: mockSocialLinks,
        meta: {
          currentPage: 1,
          lastPage: 1,
          nextPage: null,
          prevPage: null,
          totalPerPage: 10,
          total: mockSocialLinks.length,
        },
      }

      await request(app.getHttpServer())
        .get(endpoint)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeInstanceOf(Array)
          expect(res.body.meta).toStrictEqual(response.meta)
        })
    })

    it('должен вернуть список ссылок с пагинацией', async () => {
      const response: IPaginationResult<SocialLink> = {
        data: mockSocialLinks,
        meta: {
          currentPage: 2,
          lastPage: 2,
          nextPage: null,
          prevPage: 1,
          totalPerPage: 1,
          total: mockSocialLinks.length,
        },
      }

      await request(app.getHttpServer())
        .get(`${endpoint}?size=1&page=2`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeInstanceOf(Array)
          expect(res.body.meta).toStrictEqual(response.meta)
        })
    })

    it('должен вернуть список ссылок с параметром', async () => {
      await request(app.getHttpServer())
        .get(`${endpoint}?alias=instagram`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
        })
    })
  })

  describe('GET /social-links/:id', () => {
    it('должен вернуть 404 код, если ссылка не найдена', async () => {
      await request(app.getHttpServer())
        .get(`${endpoint}/8aef09fb-d437-6345-1313-1b78142c7e15`)
        .expect(404)
    })

    it('должен вернуть ссылку по идентификатору', async () => {
      await request(app.getHttpServer())
        .get(`${endpoint}/${mockSocialLinks[0].id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toStrictEqual(mockSocialLinks[0].id)
        })
    })
  })

  describe('POST /social-links', () => {
    const socialLink: CreateSocialLinkDto = {
      alias: 'test-alias',
      href: 'https://test.ru/',
      title: 'Test alias',
      creatorId: '8aef09fb-d437-4819-b457-1b78142c7e15',
    }

    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer()).post(endpoint).expect(401)
    })

    it('должен вернуть 403 код, если пользователь не администратор', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .set('Cookie', publicAuthCookie)
        .send(socialLink)
        .expect(403)
    })

    it('должен вернуть 409 код, если алиас ссылки не уникален', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .set('Cookie', adminAuthCookie)
        .send({
          ...socialLink,
          alias: 'telegram',
        })
        .expect(409)
    })

    it('должен вернуть созданную ссылку', async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .set('Cookie', adminAuthCookie)
        .send(socialLink)
        .expect(201)
        .expect((res) => {
          expect(res.body.alias).toBe(socialLink.alias)
        })
    })
  })

  describe('PUT /social-links', () => {
    const updatedSocialLink: UpdateSocialLinkDto = {
      title: 'Updated Title',
    }

    it('должен вернуть 401 код, если пользователь не аутентифицирован', async () => {
      await request(app.getHttpServer())
        .put(`${endpoint}/${uuid()}`)
        .send(updatedSocialLink)
        .expect(401)
    })

    it('должен вернуть 403 код, если пользователь не администратор', async () => {
      await request(app.getHttpServer())
        .put(`${endpoint}/${uuid()}`)
        .send(updatedSocialLink)
        .set('Cookie', publicAuthCookie)
        .expect(403)
    })

    it('должен вернуть 404 код, если ссылка не найдена', async () => {
      await request(app.getHttpServer())
        .put(`${endpoint}/${uuid()}`)
        .send(updatedSocialLink)
        .set('Cookie', adminAuthCookie)
        .expect(404)
    })

    it('должен вернуть 400 код, если не переданы данные для обновления', async () => {
      await request(app.getHttpServer())
        .put(`${endpoint}/${mockSocialLinks[0].id}`)
        .send({})
        .set('Cookie', adminAuthCookie)
        .expect(400)
    })

    it('должен вернуть 200 код, если ссылка обновлена', async () => {
      await request(app.getHttpServer())
        .put(`${endpoint}/${mockSocialLinks[0].id}`)
        .send(updatedSocialLink)
        .set('Cookie', adminAuthCookie)
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe(updatedSocialLink.title)
        })
    })
  })

  describe('DELETE /social-links', () => {
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

    it('должен вернуть 404 код, если ссылка не найдена', async () => {
      await request(app.getHttpServer())
        .delete(`${endpoint}/${uuid()}`)
        .set('Cookie', adminAuthCookie)
        .expect(404)
    })

    it('должен вернуть 200 код, если ссылка удалена', async () => {
      await request(app.getHttpServer())
        .delete(`${endpoint}/${mockSocialLinks[0].id}`)
        .set('Cookie', adminAuthCookie)
        .expect(200)
    })
  })

  afterAll(async () => {
    await app.close()
  }, 20000)
})
