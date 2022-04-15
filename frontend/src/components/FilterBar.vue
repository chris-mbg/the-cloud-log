<script>
import { ref, watch } from "vue"
import countiesData from "../data/counties.json"
import { useQuery, useResult } from "@vue/apollo-composable"
import locationsByCountyQuery from "../graphql/queries/locationsByCounty.query.graphql"
import CloudButton from "./ui/CloudButton.vue"

export default {
  components: { CloudButton },
  emits: ["countyChange", "cityChange"],
  setup(props, context) {
    const chosenCounty = ref(null)
    const chosenLocation = ref(null)

    const clearFilters = () => {
      chosenLocation.value = null
      chosenCounty.value = null
    }

    const {
      result: locationsResult,
      error: queryError,
      loading: queryLoading
    } = useQuery(locationsByCountyQuery, () => ({
      county: chosenCounty.value || ""
    }))

    const locations = useResult(
      locationsResult,
      [],
      data => data.locations.data
    )

    watch(chosenCounty, newVal => {
      if (newVal === "") {
        chosenLocation.value = null
      }
      context.emit("countyChange", newVal)
    })
    watch(chosenLocation, newVal => {
      context.emit("cityChange", newVal)
    })

    return {
      countiesData,
      locations,
      chosenCounty,
      chosenLocation,
      queryError,
      clearFilters
    }
  }
}
</script>

<template>
  <div class="p-4 m-2 rounded lg:mx-auto lg:container bg-primary text-neutral">
    <h2 class="text-xl">Filter</h2>

    <div class="">
      <p class="">By Location</p>
      <div
        class="p-2 rounded md:space-x-4 md:w-1/2 md:flex bg-neutral text-primary"
      >
        <div class="w-full">
          <label>County:</label>
          <select
            class="block w-full my-1 rounded text-primary"
            v-model="chosenCounty"
            required
          >
            <option value=""></option>
            <option v-for="county in countiesData" :value="county">
              {{ county }}
            </option>
          </select>
        </div>
        <div class="w-full">
          <div>
            <p v-if="queryError">Error: {{ queryError.message }}</p>
            <div>
              <label>City:</label>
              <select
                v-model="chosenLocation"
                class="block w-full my-1 rounded text-primary"
                required
              >
                <option v-if="!chosenCounty" value="">
                  First, choose a county
                </option>
                <!-- <option value=""></option> -->
                <option v-else v-for="l in locations" :value="l.id" :key="l.id">
                  {{ l.attributes.city }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <cloud-button @click="clearFilters">Clear all filters</cloud-button>
    </div>
  </div>
</template>
