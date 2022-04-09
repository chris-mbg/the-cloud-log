<script>
import ObservationCardGrid from "../components/ObservationCardGrid.vue"
import Pagination from "./ui/Pagination.vue"
import { useQuery, useResult } from "@vue/apollo-composable"
import getLatestObservations from "../graphql/queries/getLatestObservations.query.graphql"
import { watch, ref } from "vue"

export default {
  components: { ObservationCardGrid, Pagination },
  setup() {
    const page = ref(1)
    const hasNextPage = ref(true)

    //TODO How to get info on pageCount and such! At least fetch if page variable changes.

    const handleNextPage = () => {
      console.log("next page")
      page.value = page.value + 1
    }
    const handlePrevPage = () => {
      console.log("next page")

      page.value = page.value === 1 ? 1 : page.value - 1

      console.log("Page", page.value)
    }

    const {
      result: latestObsResult,
      error,
      loading
    } = useQuery(
      getLatestObservations,
      () => ({
        page: page.value,
        pageSize: 2 // Change this to diff value when done!
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
        console.log("Obsar fr latest, ", obsList.value)
      }
    )

    return {
      obsList,
      error,
      loading,
      page,
      hasNextPage,
      handleNextPage,
      handlePrevPage
    }
  }
}
</script>

<template>
  <p v-if="loading" class="text-center">Loading...</p>
  <p v-else-if="error" class="text-center text-red-600">
    Error fetching data...
  </p>
  <template v-else-if="obsList.length > 0">
    <h2 class="text-2xl text-center">Latest observations</h2>
    <observation-card-grid :obsList="obsList" />
    <pagination
      :currentPage="page"
      :hasNextPage="hasNextPage"
      @toNextPage="handleNextPage"
      @toPrevPage="handlePrevPage"
    ></pagination>
  </template>
  <p v-else>No observations to show...</p>
</template>
