import prisma from '@utils/prisma'

export function events() {
  return prisma.event.findMany()
}
