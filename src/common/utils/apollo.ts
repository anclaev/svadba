import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createSchema, createYoga } from 'graphql-yoga'
import { resolvers, typeDefs } from '@graphql'

export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

export const apolloServer = createYoga({
  schema: createSchema({
    resolvers,
    typeDefs,
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response },
})
