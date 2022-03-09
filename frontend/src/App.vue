<script>
import TheNav from "./components/TheNav.vue"

export default {
  components: { TheNav }
}
</script>

<template class="font-sans text-primary">
  <the-nav></the-nav>
  <router-view></router-view>
</template>
