import argon from 'argon2'

export const hash = async (val: string): Promise<string> =>
  argon.hash(val, {
    type: argon.argon2i,
  })

export const verify = async (
  hashed: string,
  target: string
): Promise<boolean> => argon.verify(hashed, target)
