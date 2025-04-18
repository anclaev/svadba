import { configSchema } from '../config.schema'

describe('ConfigSchema', () => {
  it('Должен возвращать успех, если переданы обязательные значения', () => {
    const res = configSchema.safeParse({
      TELEGRAM_BOT_TOKEN: '2f2c3f24fc24f24fc',
    })

    expect(res.success).toBe(true)
    expect(res.data).toBeDefined()
  })

  it('Должен возвращать ошибку, если не переданы обязательные значения', () => {
    const res = configSchema.safeParse({})

    expect(res.error).toBeDefined()
    expect(res.success).toBe(false)
  })
})
