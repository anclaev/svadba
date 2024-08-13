import prisma from '@utils/prisma'

export function families() {
  return prisma.family.findMany()
}
