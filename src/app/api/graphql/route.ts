import { apolloServer } from '@core/apollo'

const { handleRequest } = apolloServer

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
