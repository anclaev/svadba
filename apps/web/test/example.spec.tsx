import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import Page from '@/app/page'

describe('Example', () => {
  it('text', () => {
    render(<Page />)

    expect(2 + 2).toBe(4)
  })
})
