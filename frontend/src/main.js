import { createApp, provide, h } from "vue"
import router from "./router"
import App from "./App.vue"
import "./index.css"
import {
  DefaultApolloClient,
  provideApolloClient
} from "@vue/apollo-composable"
import defaultClient from "./graphql/client"

createApp({
  setup() {
    // provide(DefaultApolloClient, defaultClient)
    provideApolloClient(defaultClient)
  },
  render() {
    return h(App)
  }
})
  .use(router)
  .mount("#app")
