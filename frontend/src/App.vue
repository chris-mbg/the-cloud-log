<script>
import TheNav from "./components/TheNav.vue"

export default {
  components: { TheNav }
}
</script>

<template>
  <the-nav></the-nav>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: "Inter", sans-serif;
}
</style>
