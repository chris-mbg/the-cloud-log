<script>
import ObservationCardGrid from "../components/ObservationCardGrid.vue"
import ObservationCard from "../components/ObservationCard.vue"
import { useQuery, useResult } from "@vue/apollo-composable"
import getUserObservationsThisDateLastYear from "../graphql/queries/getUserObservationsThisDateLastYear.query.graphql"
import { computed, watch } from "vue"
import { useUserData } from "../providers/userProvider"

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
  <article class="p-2 mx-2 border rounded md:p-4 border-primary">
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
