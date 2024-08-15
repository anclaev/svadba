import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createYoga } from 'graphql-yoga'

import { buildSchema } from '@graphql/schema'

export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

export const apolloServer = createYoga({
  schema: buildSchema(),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Request, Response },
})
