import { ApolloProvider } from '@apollo/client'

import apollo from '@utils/apollo'

const Provider: React.FC = ({ children }) => (
  <ApolloProvider client={apollo}>{children}</ApolloProvider>
)

export default Provider
