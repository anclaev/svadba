import { PrismaService } from '#/core/prisma.service'
import { PrismaClient } from '#prisma'
import * as GRPC from '@grpc/grpc-js'
import * as ProtoLoader from '@grpc/proto-loader'
import { INestApplication } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'
import { social_link } from '@repo/shared'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { join } from 'path'

import { AppModule } from '#/app/app.module'

import { mockSocialLinks } from './mocks/social-links.mock'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('SocialLink gRPC Controller (e2e)', () => {
  let app: INestApplication
  let prisma: DeepMockProxy<PrismaClient>
  let client: any

  beforeAll(async () => {
    prisma = mockDeep<PrismaClient>()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile()

    app = moduleFixture.createNestApplication()

    await app.init()

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        package: social_link.PACKAGE_NAME,
        protoPath: join(__dirname, '../src/proto/social-link.proto'),
        loader: {
          includeDirs: [join(__dirname, '../src/proto')],
        },
      },
    })

    // Start gRPC microservice
    await app.startAllMicroservices()
    await app.init()

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

      prisma.socialLink.count.mockResolvedValue(mockSocialLinks.length)

      if (args.take && args.skip) {
        return Promise.resolve(mockSocialLinks.slice(args.skip, args.take))
      }

      return Promise.resolve(mockSocialLinks)
    })

    // Load proto-buffers for test gRPC dispatch
    const proto = ProtoLoader.loadSync(
      join(__dirname, '../src/proto/social-link.proto')
    ) as any

    // Create Raw gRPC client object
    const protoGRPC = GRPC.loadPackageDefinition(proto) as any

    // Create client connected to started services at standard 5000 port
    client = new protoGRPC.social_link.SocialLinkService(
      'localhost:5000',
      GRPC.credentials.createInsecure()
    )
  })

  describe('GetSocialLinks', () => {
    it(`должен возвращать список ссылок`, async () => {
      return new Promise((resolve) => {
        client.GetSocialLinks({}, {}, (err: any, result: any) => {
          // Compare results
          expect(err).toBeNull()

          expect(result).toBeDefined()
          expect(result.items).toBeInstanceOf(Array)

          // Resolve after checkups
          resolve(true)
        })
      })
    })
  })

  afterAll(async () => {
    await client.close()
    await app.close()
  })
})
