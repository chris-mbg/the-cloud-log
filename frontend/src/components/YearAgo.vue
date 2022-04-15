<script>
import ObservationCardGrid from "../components/ObservationCardGrid.vue"
import ObservationCard from "../components/ObservationCard.vue"
import { useQuery, useResult } from "@vue/apollo-composable"
import getUserObservationsThisDateLastYear from "../graphql/queries/getUserObservationsThisDateLastYear.query.graphql"
import { computed, watch } from "vue"
import { useUserData } from "../../providers/userProvider"

export default {
  components: {
    ObservationCardGrid,
    ObservationCard
  },
  setup() {
    const { getId } = useUserData()

    const getDateString = (begin = true) => {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth()
      const day = today.getDate().toString().padStart(2, "0")
      if (month < 9) {
        let hello = begin
          ? `${year - 1}-0${month + 1}-${day}T00:00`
          : `${year - 1}-0${month + 1}-${day}T23:59`
        console.log("hello", hello)
        return hello
      } else {
        return begin
          ? `${year - 1}-${month + 1}-${day}T00:00`
          : `${year - 1}-${month + 1}-${day}T23:59`
      }
    }

    const beginDate = computed(() => new Date(getDateString()).toISOString())
    const endDate = computed(() => new Date(getDateString(false)).toISOString())

    console.log(beginDate.value, endDate.value)

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
  <article class="w-3/5 p-4 mx-auto border rounded border-primary">
    <h1 class="mb-4 text-2xl text-center text-orange-500">
      On this day, a year ago
    </h1>

    <p v-if="loading" class="text-center">Loading...</p>
    <p v-else-if="error" class="text-center text-red-600">
      Error fetching data...
    </p>

    <ObservationCardGrid :obsList="obsList" v-else-if="obsList.length" />

    <p v-else class="text-center">No observations from this day</p>
  </article>
</template>
