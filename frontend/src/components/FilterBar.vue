<script>
import { defineComponent, reactive, ref, watch } from "vue"
import countiesData from "../data/counties.json"
import { useQuery, useResult } from "@vue/apollo-composable"
import locationsByCountyQuery from "../graphql/queries/locationsByCounty.query.graphql"
import CloudButton from "./ui/CloudButton.vue"
import { debounce } from "../utils/debounce"

export default defineComponent({
  components: { CloudButton },
  emits: ["filterChange", "filterClear"],
  setup(props, context) {
    const openFilters = ref(window.innerWidth > 1024 ? true : false)

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

      context.emit("filterClear")
    }

    const { result: locationsResult, error: queryError } = useQuery(
      locationsByCountyQuery,
      () => ({
        county: searchVariables.county || ""
      })
    )

    const locations = useResult(
      locationsResult,
      [],
      data => data.locations.data
    )

    watch(searchVariables, newVal => {
      if (newVal.county === "") {
        searchVariables.city = ""
      }
      context.emit("filterChange", newVal)
    })

    return {
      searchVariables,
      countiesData,
      locations,
      queryError,
      clearFilters,
      openFilters,
      debounceWeather: debounce(
        event => (searchVariables.weather = event.target.value)
      )
    }
  }
})
</script>

<template>
  <div
    class="content-start max-w-4xl p-4 mx-auto mb-4 rounded bg-primary text-neutral lg:mx-auto"
  >
    <div
      class="flex items-center justify-between mb-2 cursor-pointer"
      @click="openFilters = !openFilters"
    >
      <h2 class="text-xl">Filter observations</h2>
      <span class="text-lg">
        <font-awesome icon="filter" />
      </span>
    </div>

    <div v-show="openFilters" class="space-y-2">
      <div>
        <p class="mb-1">By Date</p>
        <div class="p-2 rounded bg-neutral text-primary">
          <div class="w-full">
            <label>Date:</label>
            <input v-model="searchVariables.date" type="date" />
          </div>
        </div>
      </div>
      <div>
        <p class="mb-1">By Weather</p>
        <div class="p-2 rounded bg-neutral text-primary">
          <div class="w-full">
            <label>Weather</label>
            <input
              @input="debounceWeather"
              :value="searchVariables.weather"
              type="text"
              placeholder="Type a weather type..."
            />
          </div>
        </div>
      </div>
      <div>
        <p class="mb-1">By Location</p>
        <div class="p-2 rounded bg-neutral text-primary">
          <div class="w-full">
            <label>County:</label>
            <select v-model="searchVariables.county" required>
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
                <select v-model="searchVariables.city" required>
                  <option v-if="!searchVariables.county" value="">
                    First, select a county...
                  </option>
                  <option
                    v-else
                    v-for="l in locations"
                    :value="l.id"
                    :key="l.id"
                  >
                    {{ l.attributes.city }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-8">
        <cloud-button @click="clearFilters">Clear all filters</cloud-button>
      </div>
    </div>
  </div>
</template>
