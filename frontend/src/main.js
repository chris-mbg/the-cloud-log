import { createApp, provide, h } from "vue"
import App from "./App.vue"
import "./index.css"

import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { DefaultApolloClient } from "@vue/apollo-composable"

const defaultClient = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache()
})

createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient)
  },
  render() {
    return h(App)
  }
}).mount("#app")
