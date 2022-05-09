<script>
import ObservationCardGrid from "../components/ObservationCardGrid.vue"
import ObservationCard from "../components/ObservationCard.vue"
import { useQuery, useResult } from "@vue/apollo-composable"
import getUserObservationsThisDateLastYear from "../graphql/queries/getUserObservationsThisDateLastYear.query.graphql"
import { computed } from "vue"
import { useUserData } from "../providers/userProvider"
import { getDateString } from "../utils/getDateString"

export default {
  components: {
    ObservationCardGrid,
    ObservationCard
  },
  setup() {
    const { getId } = useUserData()

    const beginDate = computed(() => new Date(getDateString()).toISOString())
    const endDate = computed(() => new Date(getDateString(false)).toISOString())

    const {
      result: thisDayObsResult,
      error,
      loading
    } = useQuery(getUserObservationsThisDateLastYear, () => ({
      begin: beginDate.value,
      end: endDate.value,
      userId: getId.value
    }))

    const obsList = useResult(
      thisDayObsResult,
      [],
      data => data.observations.data
    )

    return { obsList, loading, error }
  }
}
</script>

<template>
  <article class="p-2 mx-2 rounded md:p-4s">
    <div class="flex items-center justify-center mb-2">
      <h1 class="text-xl text-center text-orange-500 md:text-2xl">Remember?</h1>
      <span class="text-lg text-center">&nbsp; - On this day, a year ago</span>
    </div>

    <p v-if="loading" class="text-center">Loading...</p>
    <p v-else-if="error" class="text-center text-red-600">
      Error fetching data...
    </p>

    <ObservationCardGrid :obsList="obsList" v-else-if="obsList.length" />

    <p v-else class="text-center">No observations from this day</p>
  </article>
</template>
