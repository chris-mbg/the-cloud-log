<script>
import { computed, defineComponent, reactive } from "vue"
import CloudButton from "../components/ui/CloudButton.vue"
import { useMutation } from "@vue/apollo-composable"
import {
  getDirectionFromValue,
  getCloudCoverFromValue,
  weatherTypes,
  hours
} from "../utils/weatherHelpers"
import { useUserData } from "../providers/userProvider"
import createObservationMutation from "../graphql/mutations/createObservation.mutation.graphql"
import { useRouter } from "vue-router"

export default defineComponent({
  components: { CloudButton },
  setup() {
    const router = useRouter()

    const userData = useUserData()
    const userLocation = computed(() => userData.getLocation.value)

    const {
      mutate: createObs,
      error,
      loading
    } = useMutation(createObservationMutation)

    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "VAR"]
    const cloudCover = ["SKC", "FEW", "SCT", "BKN", "OVC"]

    const observationData = reactive({
      date: "",
      hour: "",
      minute: "",
      temp: null,
      windDir: "",
      windSpeed: "",
      weather: "",
      cloudCover: "",
      cloudTypes: "",
      personal: ""
    })

    const handleSubmit = async () => {
      try {
        await createObs({
          observation_time: new Date(
            observationData.date +
              "T" +
              observationData.hour +
              ":" +
              observationData.minute
          ),
          temperature: Number(observationData.temp),
          weather: observationData.weather,
          wind_direction: observationData.windDir,
          wind_speed: Number(observationData.windSpeed),
          cloud_cover: observationData.cloudCover,
          cloud_types: observationData.cloudTypes,
          personal: observationData.personal,
          user: userData.getId.value
        })

        router.push("/observations")
      } catch (err) {
        console.log(err)
      }
    }

    return {
      observationData,
      userLocation,
      directions,
      cloudCover,
      weatherTypes,
      hours,
      getDirectionFromValue,
      getCloudCoverFromValue,
      handleSubmit,
      error,
      loading
    }
  }
})
</script>

<template>
  <form
    class="w-5/6 mx-auto my-4 space-y-4 text-left lg:w-2/3"
    @submit.prevent="handleSubmit"
  >
    <div>
      <label>Location</label>
      <p>
        <span class="font-semibold">{{ userLocation.attributes.city }}</span>
        -
        <span>{{ userLocation.attributes.county }}</span>
      </p>
    </div>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div class="col-span-2">
        <label>Date</label>
        <input
          v-model="observationData.date"
          required
          type="date"
          :min="new Date(Date.now() - 604800000).toISOString().split('T')[0]"
          :max="new Date().toISOString().split('T')[0]"
        />
      </div>
      <div>
        <label>Hour</label>
        <select v-model="observationData.hour" required>
          <option v-for="hour in hours" :value="hour">{{ hour }}</option>
        </select>
      </div>
      <div>
        <label>Minute</label>
        <select v-model="observationData.minute" required>
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
      </div>
    </div>
    <div>
      <label>Temperature <span>&deg;C</span></label>
      <input
        v-model="observationData.temp"
        required
        type="number"
        step="0.1"
        min="-50"
        max="50"
      />
    </div>
    <div class="grid-cols-2 gap-4 sm:grid">
      <div>
        <label>Wind direction</label>
        <select class="capitalize" required v-model="observationData.windDir">
          <option v-for="dir in directions" :value="dir" :key="dir">
            {{ getDirectionFromValue(dir) }}
          </option>
        </select>
      </div>
      <div>
        <label>Wind speed <span>m/s</span></label>
        <input
          v-model="observationData.windSpeed"
          required
          type="number"
          step="1"
          min="0"
          max="50"
        />
      </div>
    </div>
    <div>
      <label>Weather</label>
      <input
        v-model="observationData.weather"
        type="text"
        required
        list="weather-types"
      />
      <datalist id="weather-types">
        <option
          class="block w-full my-1 rounded"
          v-for="w in weatherTypes"
          :value="w"
        />
      </datalist>
    </div>
    <div>
      <label>Cloud cover</label>
      <select class="capitalize" required v-model="observationData.cloudCover">
        <option v-for="c in cloudCover" :value="c" :key="c">
          {{ getCloudCoverFromValue(c) }}
        </option>
      </select>
    </div>
    <div>
      <label>Cloud types</label>
      <input
        v-model="observationData.cloudTypes"
        type="text"
        placeholder="ie cirrus, cumulus, CB..."
      />
    </div>
    <div>
      <label>Personal thoughts</label>
      <textarea
        v-model="observationData.personal"
        rows="5"
        placeholder="What do you want to remember from this day?"
      />
    </div>

    <cloud-button class="mx-auto" :disabled="loading"
      >Save observation</cloud-button
    >
    <div
      class="p-4 text-center text-red-600 border border-red-600"
      v-if="error"
    >
      <p>Error: {{ error.message }}</p>
    </div>
  </form>
</template>
