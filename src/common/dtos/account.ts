import { Prisma } from '@prisma/client'

export type CreateAccountDto = {
  email: string
  password: string
  family?: {
    create: Prisma.AccountCreateInput
    connect: Prisma.AccountWhereUniqueInput
  }
}
