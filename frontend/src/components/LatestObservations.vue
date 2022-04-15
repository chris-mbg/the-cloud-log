<script>
import ObservationCardGrid from "../components/ObservationCardGrid.vue"
import Pagination from "./ui/Pagination.vue"
import FilterBar from "./FilterBar.vue"
import { useQuery, useResult } from "@vue/apollo-composable"
import getLatestObservations from "../graphql/queries/getLatestObservations.query.graphql"
import { watch, ref } from "vue"
import usePagination from "../composables/usePagination"

export default {
  components: { ObservationCardGrid, Pagination, FilterBar },
  setup() {
    const { page, hasNextPage, handleNextPage, handlePrevPage } =
      usePagination()

    const county = ref(null)
    const city = ref(null)

    const handleCountyChange = value => {
      if (value === "") {
        county.value = null
        city.value = null
      } else {
        county.value = value
      }
    }
    const handleCityChange = value => {
      if (value === "") {
        city.value = null
      } else {
        city.value = value
      }
    }

    const getQueryVariables = () => {
      if (county.value && city.value) {
        return {
          page: page.value,
          pageSize: 10,
          county: county.value,
          city: city.value
        }
      }
      if (county.value) {
        return {
          page: page.value,
          pageSize: 10,
          county: county.value
        }
      }
      return {
        page: page.value,
        pageSize: 10
      }
    }
    const {
      result: latestObsResult,
      error,
      loading
    } = useQuery(getLatestObservations, () => getQueryVariables(), {
      fetchPolicy: "cache-and-network"
    })

    const obsList = useResult(latestObsResult, [], data => {
      hasNextPage.value =
        data.observations.meta.pagination.pageCount > page.value
      return data.observations.data
    })

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
      handlePrevPage,
      handleCountyChange,
      handleCityChange
    }
  }
}
</script>

<template>
  <h2 class="text-3xl text-center">Latest observations</h2>
  <filter-bar
    @countyChange="handleCountyChange"
    @cityChange="handleCityChange"
  ></filter-bar>
  <p v-if="loading" class="text-center">Loading...</p>
  <p v-else-if="error" class="text-center text-red-600">
    Error fetching data...
  </p>
  <template v-else-if="obsList.length > 0">
    <observation-card-grid :obsList="obsList" />
    <pagination
      :currentPage="page"
      :hasNextPage="hasNextPage"
      @toNextPage="handleNextPage"
      @toPrevPage="handlePrevPage"
    ></pagination>
  </template>
  <p v-else class="text-center">No observations found...</p>
</template>
