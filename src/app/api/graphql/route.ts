import { createSchema, createYoga } from 'graphql-yoga'
import { resolvers, typeDefs } from '@graphql'

const { handleRequest } = createYoga({
  schema: createSchema({
    resolvers,
    typeDefs,
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response },
})

export { handleRequest as GET, handleRequest as POST }
