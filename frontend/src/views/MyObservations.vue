<script>
import { watch } from "vue"
import { useQuery, useResult } from "@vue/apollo-composable"
import getUserObservations from "../graphql/queries/getUserObservations.query.graphql"
import { useUserData } from "../../providers/userProvider"
import ObservationCardGrid from "../components/ObservationCardGrid.vue"
import ObservationCard from "../components/ObservationCard.vue"

export default {
  components: { ObservationCard, ObservationCardGrid },
  setup() {
    const { getId } = useUserData()

    const { result: userObsResult, error } = useQuery(
      getUserObservations,
      () => ({
        userId: getId.value
      }),
      {
        fetchPolicy: "cache-and-network"
      }
    )
    const userObsList = useResult(
      userObsResult,
      [],
      data => data.observations.data
    )

    watch(
      () => userObsList.value,
      () => {
        console.log("Obsar, ", userObsList.value)
      }
    )

    return { userObsList }
  }
}
</script>

<template>
  <h1 class="my-4 text-3xl text-center lg:my-6">My latest observations</h1>
  <template v-if="userObsList.length > 0">
    <observation-card-grid :obsList="userObsList" />
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
