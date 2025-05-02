import * as GRPC from '@grpc/grpc-js'
import * as ProtoLoader from '@grpc/proto-loader'
import { INestApplication, Module } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'
import { bot } from '@repo/shared'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { join } from 'path'

import { AppModule } from '#/app/app.module'
import { BotUpdate } from '#/bot/bot.update'

@Module({})
class MockModule {}

jest.mock('@grammyjs/nestjs', () => {
  return {
    NestjsGrammyModule: {
      forRootAsync: jest.fn().mockImplementation(() => MockModule),
    },
  }
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Bot gRPC Controller (e2e)', () => {
  let app: INestApplication
  let botUpdate: DeepMockProxy<BotUpdate>
  let client: any

  beforeAll(async () => {
    botUpdate = mockDeep<BotUpdate>()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BotUpdate)
      .useValue(botUpdate)
      .compile()

    app = moduleFixture.createNestApplication()

    await app.init()

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5002',
        package: bot.PACKAGE_NAME,
        protoPath: join(__dirname, '../src/proto/bot.proto'),
        loader: {
          includeDirs: [join(__dirname, '../src/proto')],
        },
      },
    })

    // Start gRPC microservice
    await app.startAllMicroservices()
    await app.init()

    // Load proto-buffers for test gRPC dispatch
    const proto = ProtoLoader.loadSync(
      join(__dirname, '../src/proto/bot.proto')
    ) as any

    // Create Raw gRPC client object
    const protoGRPC = GRPC.loadPackageDefinition(proto) as any

    // Create client connected to started services at standard 5002 port
    client = new protoGRPC.bot.BotService(
      'localhost:5002',
      GRPC.credentials.createInsecure()
    )
  })

  describe('Health', () => {
    it(`должен возвращать статус здоровья`, async () => {
      return new Promise((resolve) => {
        client.Health({}, {}, (err: any, result: any) => {
          expect(err).toBeNull()

          expect(result).toBeDefined()
          expect(result.status).toBe('healthly')

          // Resolve after checkups
          resolve(true)
        })
      })
    })
  })

  describe('SendMessage', () => {
    it(`должен возвращать статус отправки сообщения`, async () => {
      const mockMessage = 'test'

      return new Promise((resolve) => {
        client.SendMessage(
          { message: mockMessage },
          {},
          (err: any, result: any) => {
            expect(err).toBeNull()

            expect(result).toBeDefined()
            expect(result.status).toBe(mockMessage)

            // Resolve after checkups
            resolve(true)
          }
        )
      })
    })
  })

  afterAll(async () => {
    await client.close()
    await app.close()
  })
})
