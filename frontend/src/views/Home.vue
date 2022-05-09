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
  <div class="grid-cols-6 sm:grid md:py-4">
    <div class="col-span-6 text-center lg:col-span-3">
      <h1 class="my-6 text-2xl lg:text-4xl font-heading">
        Welcome, {{ getUsername }}!
      </h1>
      <p class="hidden lg:block">
        everywhere you go always take the weather with you
      </p>
    </div>
    <div class="col-span-6 lg:col-span-3">
      <year-ago></year-ago>
    </div>
    <hr class="col-span-6 m-4 lg:m-8" />

    <div class="col-span-6">
      <latest-observations></latest-observations>
    </div>
  </div>
</template>
