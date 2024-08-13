import { accounts, families, guests, events } from '@graphql/queries'

export const resolvers = {
  Query: {
    accounts,
    families,
    guests,
    events,
  },
}
