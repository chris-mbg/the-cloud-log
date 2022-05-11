import { createApp, provide, h } from "vue"
import router from "./router"
import App from "./App.vue"
import { DefaultApolloClient } from "@vue/apollo-composable"
import defaultClient from "./graphql/client"
import { FontAwesomeIcon } from "./plugins/font-awesome"
import "./index.css"

createApp({
  setup() {
    provide(DefaultApolloClient, defaultClient)
  },
  render() {
    return h(App)
  }
})
  .use(router)
  .component("font-awesome", FontAwesomeIcon)
  .mount("#app")
