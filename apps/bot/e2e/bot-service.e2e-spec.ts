import { Server } from '@grpc/grpc-js'
import { join } from 'path'

import { bootstrapGrpcServer } from '#/grpc/bootstrap'
import { createClient, health, sendMessage } from '#/grpc/utils'
import { BotServiceClient } from '#/proto/interfaces/bot/BotService'

describe('BotService', () => {
  const port = 3032

  let client: BotServiceClient | null = null
  let server: Server | null = null

  beforeAll(async () => {
    server = await bootstrapGrpcServer(port)
    client = createClient(join(__dirname, '../src/proto/bot.proto'), port)
  })

  describe('Health', () => {
    it('должен возвращать статус', async () => {
      const res = await health(client!, {})
      expect(res).toEqual({ status: 'healthly' })
    })
  })

  describe('SendMessage', () => {
    it('должен возвращать ok', async () => {
      const res = await sendMessage(client!, {
        appToken: '',
        message: '',
        telegramId: '',
      })

      expect(res).toEqual({ status: 'okk' })
    })
  })

  afterAll(() => {
    if (server) {
      server.forceShutdown()
    }
  })
})
