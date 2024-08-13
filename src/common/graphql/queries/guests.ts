import prisma from '@utils/prisma'

export function guests() {
  return prisma.guest.findMany()
}
