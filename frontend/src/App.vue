<script>
import { defineComponent } from "vue"
import { initUser } from "./providers/userProvider"
import TheNav from "./components/TheNav.vue"

export default defineComponent({
  components: { TheNav },
  setup() {
    initUser()
  }
})
</script>

<template class="font-sans text-primary">
  <the-nav></the-nav>
  <router-view></router-view>
</template>

<style>
#app {
  padding-bottom: 2.5rem;
}
</style>
