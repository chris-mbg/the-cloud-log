<script>
import ObservationCardGrid from "../components/ObservationCardGrid.vue"
import YearAgo from "../components/YearAgo.vue"
import { useQuery, useResult } from "@vue/apollo-composable"
import getLatestObservations from "../graphql/queries/getLatestObservations.query.graphql"
import { watch } from "vue"

export default {
  components: { ObservationCardGrid, YearAgo },
  setup() {
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

    return { obsList }
  }
}
</script>

<template class="font-sans text-primary">
  <h1 class="my-6 text-2xl text-center text-orange-500">This is Home</h1>

  <year-ago></year-ago>

  <template v-if="obsList.length > 0">
    <observation-card-grid :obsList="obsList" />
  </template>
</template>
