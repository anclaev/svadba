import prisma from '@utils/prisma'

export function accounts() {
  return prisma.account.findMany()
}
