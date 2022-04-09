<script>
import ObservationCardGrid from "../components/ObservationCardGrid.vue"
import YearAgo from "../components/YearAgo.vue"
import { useQuery, useResult } from "@vue/apollo-composable"
import getLatestObservations from "../graphql/queries/getLatestObservations.query.graphql"
import { watch } from "vue"
import { useUserData } from "../../providers/userProvider"

export default {
  components: { ObservationCardGrid, YearAgo },
  setup() {
    const { getUsername } = useUserData()

    const { result: latestObsResult, error } = useQuery(
      getLatestObservations,
      () => ({
        page: 1,
        pageSize: 20
      }),
      {
        fetchPolicy: "cache-and-network"
      }
    )

    const obsList = useResult(
      latestObsResult,
      [],
      data => data.observations.data
    )

    watch(
      () => obsList.value,
      () => {
        console.log("Obsar fr Home, ", obsList.value)
      }
    )

    return { obsList, getUsername }
  }
}
</script>

<template class="font-sans text-primary">
  <h1 class="my-6 text-2xl text-center lg:text-4xl font-heading">
    Welcome, {{ getUsername }}!
  </h1>

  <year-ago></year-ago>

  <hr class="m-4" />

  <template v-if="obsList.length > 0">
    <h2 class="text-2xl text-center">Latest observations</h2>
    <observation-card-grid :obsList="obsList" />
  </template>
</template>
