<script>
import { watch } from "vue"
import { useQuery, useResult } from "@vue/apollo-composable"
import { useUserData } from "../providers/userProvider"
import usePagination from "../composables/usePagination"
import ObservationCardGrid from "../components/ObservationCardGrid.vue"
import ObservationCard from "../components/ObservationCard.vue"
import Pagination from "../components/ui/Pagination.vue"
import getUserObservations from "../graphql/queries/getUserObservations.query.graphql"

export default {
  components: { ObservationCard, ObservationCardGrid, Pagination },
  setup() {
    const { getId } = useUserData()

    const { page, hasNextPage, lastPage, handleNextPage, handlePrevPage } =
      usePagination()

    const {
      result: userObsResult,
      error,
      loading
    } = useQuery(
      getUserObservations,
      () => ({
        userId: getId.value
      }),
      {
        fetchPolicy: "cache-and-network"
      }
    )
    const userObsList = useResult(userObsResult, [], data => {
      hasNextPage.value =
        data.observations.meta.pagination.pageCount > page.value
      lastPage.value = data.observations.meta.pagination.pageCount
      return data.observations.data
    })

    return {
      userObsList,
      error,
      loading,
      page,
      hasNextPage,
      lastPage,
      handleNextPage,
      handlePrevPage
    }
  }
}
</script>

<template>
  <h1 class="my-4 text-3xl text-center lg:my-6">My latest observations</h1>
  <p class="text-center" v-if="loading">Loading...</p>
  <p v-else-if="error">Error fetching your observations...</p>
  <template v-else-if="userObsList.length > 0">
    <observation-card-grid :obsList="userObsList" />
    <pagination
      :currentPage="page"
      :hasNextPage="hasNextPage"
      :lastPage="lastPage"
      @toNextPage="handleNextPage"
      @toPrevPage="handlePrevPage"
    ></pagination>
  </template>
  <template v-else>
    <p class="text-center">
      No observations to show yet... Add one

      <router-link to="/new-obs" class="font-bold"
        ><font-awesome icon="long-arrow-alt-right" /> here</router-link
      >
    </p>
  </template>
</template>
