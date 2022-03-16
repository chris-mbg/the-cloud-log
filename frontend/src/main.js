import { createApp, provide, h } from "vue"
import router from "./router"
import App from "./App.vue"
import "./index.css"
import {
  DefaultApolloClient,
  provideApolloClient
} from "@vue/apollo-composable"
import defaultClient from "./graphql/client"
import { FontAwesomeIcon } from "./plugins/font-awesome"

createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient)
    // provideApolloClient(defaultClient)
  },
  render() {
    return h(App)
  }
})
  .use(router)
  .component("font-awesome", FontAwesomeIcon)
  .mount("#app")
