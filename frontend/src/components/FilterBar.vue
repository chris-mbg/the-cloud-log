<script>
import { reactive, ref, watch } from "vue"
import countiesData from "../data/counties.json"
import { useQuery, useResult } from "@vue/apollo-composable"
import locationsByCountyQuery from "../graphql/queries/locationsByCounty.query.graphql"
import CloudButton from "./ui/CloudButton.vue"

export default {
  components: { CloudButton },
  emits: ["filterChange"],
  setup(props, context) {
    const searchVariables = reactive({
      weather: "",
      date: "",
      county: "",
      city: ""
    })

    const clearFilters = () => {
      searchVariables.weather = ""
      searchVariables.date = ""
      searchVariables.county = ""
      searchVariables.city = ""
    }

    const {
      result: locationsResult,
      error: queryError,
      loading: queryLoading
    } = useQuery(locationsByCountyQuery, () => ({
      county: searchVariables.county || ""
    }))

    const locations = useResult(
      locationsResult,
      [],
      data => data.locations.data
    )

    watch(searchVariables, newVal => {
      context.emit("filterChange", newVal)
      if (newVal.county === "") {
        searchVariables.city = ""
      }
    })

    return {
      searchVariables,
      countiesData,
      locations,
      queryError,
      clearFilters
    }
  }
}
</script>

<template>
  <div
    class="grid content-start grid-cols-6 gap-4 p-4 rounded lg:mx-auto bg-primary text-neutral"
  >
    <h2 class="col-span-6 text-xl">Filter observations</h2>

    <div class="col-span-12">
      <p class="mb-1">By Date</p>
      <div class="p-2 rounded bg-neutral text-primary">
        <div class="w-full">
          <label>Date:</label>
          <input
            v-model="searchVariables.date"
            type="date"
            class="block w-full my-1 rounded text-primary"
          />
        </div>
      </div>
    </div>
    <div class="col-span-12">
      <p class="mb-1">By Location</p>
      <div class="p-2 rounded bg-neutral text-primary">
        <div class="w-full">
          <label>County:</label>
          <select
            class="block w-full my-1 rounded text-primary"
            v-model="searchVariables.county"
            required
          >
            <option value="">Select a county...</option>
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
                v-model="searchVariables.city"
                class="block w-full my-1 rounded text-primary"
                required
              >
                <option v-if="!searchVariables.county" value="">
                  First, select a county...
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
    <div class="col-span-12">
      <p class="mb-1">By Weather</p>
      <div class="p-2 rounded bg-neutral text-primary">
        <div class="w-full">
          <label>Weather</label>
          <input
            v-model="searchVariables.weather"
            type="text"
            class="block w-full my-1 rounded text-primary"
            placeholder="Type a weather type..."
          />
        </div>
      </div>
    </div>
    <div class="flex justify-end col-span-12 mt-8">
      <cloud-button @click="clearFilters">Clear all filters</cloud-button>
    </div>
  </div>
</template>
