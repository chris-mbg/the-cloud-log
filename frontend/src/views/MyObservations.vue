<script>
import { ref, watch } from "vue"
import CloudButton from "../components/ui/CloudButton.vue"
import { useQuery, useResult } from "@vue/apollo-composable"
import getUserObservations from "../graphql/queries/getUserObservations.query.graphql"
import { useUserData } from "../../providers/userProvider"
import ObservationCard from "../components/ObservationCard.vue"

export default {
  components: { ObservationCard },
  setup() {
    const { getId } = useUserData()

    const { result: userObsResult, error } = useQuery(
      getUserObservations,
      () => ({
        userId: getId.value
      })
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
  <div>{{ userObsList }}</div>
  <template v-if="userObsList.length > 0">
    <span>This will show</span>

    <observation-card
      v-for="obs in userObsList"
      :key="obs.id"
      :id="obs.id"
      :time="obs.attributes.observation_time"
      :temperature="obs.attributes.temperature"
      :weather="obs.attributes.weather"
      :wind_direction="obs.attributes.wind_direction"
      :wind_speed="obs.attributes.wind_speed"
      :cloud_cover="obs.attributes.cloud_cover"
      :cloud_types="obs.attributes.cloud_types"
      :personal="obs.attributes.personal"
    />
  </template>
</template>
