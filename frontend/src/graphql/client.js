import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const getHeaders = () => {
  const headers = {}
  const token = window.localStorage.getItem("access-token")
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  return headers
}

const httpLink = new HttpLink({
  uri: "http://localhost:1337/graphql",
  headers: getHeaders()
})

const defaultClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default defaultClient
