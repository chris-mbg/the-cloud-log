<script>
import YearAgo from "../components/YearAgo.vue"
import LatestObservations from "../components/LatestObservations.vue"
import { useUserData } from "../providers/userProvider"

export default {
  components: { YearAgo, LatestObservations },
  setup() {
    const { getUsername } = useUserData()

    return { getUsername }
  }
}
</script>

<template class="font-sans text-primary">
  <h1 class="my-6 text-2xl text-center lg:text-4xl font-heading">
    Welcome, {{ getUsername }}!
  </h1>

  <year-ago></year-ago>

  <hr class="m-4" />

  <latest-observations></latest-observations>
</template>
