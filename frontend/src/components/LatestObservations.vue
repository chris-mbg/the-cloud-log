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
  <div class="grid-cols-6 gap-4 lg:grid">
    <h2 class="col-span-6 mb-8 text-3xl text-center font-heading">
      Latest observations
    </h2>
    <filter-bar
      class="col-span-2 lg:mx-4"
      @countyChange="handleCountyChange"
      @cityChange="handleCityChange"
    ></filter-bar>
    <p v-if="loading" class="col-span-4 text-center">Loading...</p>
    <p v-else-if="error" class="col-span-4 text-center text-red-600">
      Error fetching data...
    </p>
    <template v-else-if="obsList.length > 0">
      <div class="col-span-4">
        <observation-card-grid :obsList="obsList" />
        <pagination
          :currentPage="page"
          :hasNextPage="hasNextPage"
          @toNextPage="handleNextPage"
          @toPrevPage="handlePrevPage"
        ></pagination>
      </div>
    </template>
    <p v-else class="col-span-4 text-center">No observations found...</p>
  </div>
</template>
