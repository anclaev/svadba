import bcrypt from 'bcrypt'

export const hash = async (val: string): Promise<string> => bcrypt.hash(val, 10)

export const verify = async (
  hashed: string,
  target: string
): Promise<boolean> => bcrypt.compare(target, hashed)
