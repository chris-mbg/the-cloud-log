import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat
} from "@apollo/client"

const httpLink = new HttpLink({ uri: import.meta.env.VITE_STRAPI_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("access-token")

  operation.setContext({
    headers: {
      ...operation.headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  })

  return forward(operation)
})

const defaultClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})

export default defaultClient
