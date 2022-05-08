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

    const filters = ref({})

    const handleFilterChange = values => {
      console.log("Value", values)
      if (values) {
        filters.value = { ...values }
      }
    }

    // const getQueryVariables = () => {
    //   if (county.value && city.value) {
    //     return {
    //       page: page.value,
    //       pageSize: 10,
    //       county: county.value,
    //       city: city.value
    //     }
    //   }
    //   if (county.value) {
    //     return {
    //       page: page.value,
    //       pageSize: 10,
    //       county: county.value
    //     }
    //   }
    //   return {
    //     page: page.value,
    //     pageSize: 10
    //   }
    // }
    const {
      result: latestObsResult,
      error,
      loading
    } = useQuery(
      getLatestObservations,
      () => ({
        page: page.value,
        pageSize: 10,
        weather: filters.value.weather || undefined,
        county: filters.value.county || undefined,
        city: filters.value.city || undefined,
        dateFrom: filters.value.date
          ? new Date(`${filters.value.date}T00:00`)
          : new Date(null),
        dateTo: filters.value.date
          ? new Date(`${filters.value.date}T23:59`)
          : new Date()
      }),
      {
        fetchPolicy: "cache-and-network"
      }
    )

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
      handleFilterChange
    }
  }
}
</script>

<template>
  <div class="grid-cols-12 gap-4 lg:grid">
    <h2 class="col-span-12 mb-8 text-3xl text-center font-heading">
      Latest observations
    </h2>
    <filter-bar
      class="col-span-3 lg:mx-4"
      @filterChange="handleFilterChange"
    ></filter-bar>
    <p v-if="loading" class="col-span-4 text-center">Loading...</p>
    <p v-else-if="error" class="col-span-4 text-center text-red-600">
      Error fetching data...
    </p>
    <template v-else-if="obsList.length > 0">
      <div class="col-span-6">
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
