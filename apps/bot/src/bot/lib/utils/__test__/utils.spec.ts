import { initial } from '..'

describe('utils/initial', () => {
  it('должно возвращать начальную сессию', () => {
    expect(initial()).toStrictEqual({ telegramId: null })
  })
})
