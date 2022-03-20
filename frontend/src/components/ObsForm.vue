<script>
import { computed, reactive } from "vue"
import CloudButton from "../components/ui/CloudButton.vue"
import { useMutation } from "@vue/apollo-composable"
import {
  getDirectionFromValue,
  getCloudCoverFromValue,
  weatherTypes
} from "../utils/weatherHelpers"
import { useUserData } from "../../providers/userProvider"
import createObservationMutation from "../graphql/mutations/createObservation.mutation.graphql"

export default {
  components: { CloudButton },
  setup() {
    const userData = useUserData()
    const userLocation = computed(() => userData.getLocation.value)
    const { mutate: createObs } = useMutation(createObservationMutation)

    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "VAR"]
    const cloudCover = ["SKC", "FEW", "SCT", "BKN", "OVC"]

    const observationData = reactive({
      date: "",
      time: "",
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
        const result = await createObs({
          observation_time: new Date(
            observationData.date + "T" + observationData.time
          ),
          temperature: Number(observationData.temp),
          weather: observationData.weather,
          wind_direction: observationData.windDir,
          wind_speed: Number(observationData.windSpeed),
          cloud_cover: observationData.cloudCover,
          cloud_types: observationData.cloudTypes,
          personal: observationData.personal,
          user: userData.getId.value,
          location: userLocation.value.id
        })

        console.log("Saved obs :: ", result)
      } catch (err) {
        console.log(err)
        console.log(err.message)
      }
    }

    return {
      observationData,
      userLocation,
      directions,
      cloudCover,
      weatherTypes,
      getDirectionFromValue,
      getCloudCoverFromValue,
      handleSubmit
    }
  }
}
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
    <!-- <div>
      <label>Time of observation</label>
      <input
        required
        type="datetime-local"
        class="block w-full my-1 rounded"
        :min="new Date(Date.now() - 604800000).toISOString()"
        :max="new Date(Date.now()).toISOString()"
      />
    </div> -->
    <div>
      <label>Date</label>
      <input
        v-model="observationData.date"
        required
        type="date"
        class="block w-full my-1 rounded"
        :min="new Date(Date.now() - 604800000).toISOString()"
        :max="new Date(Date.now()).toISOString()"
      />
      <label>Time</label>
      <input
        v-model="observationData.time"
        required
        type="time"
        class="block w-full my-1 rounded"
        :step="60 * 30"
      />
    </div>
    <div>
      <label>Temperature <span>&deg;C</span></label>
      <input
        v-model="observationData.temp"
        required
        type="number"
        step="0.1"
        class="block w-full my-1 rounded"
        min="-50"
        max="50"
      />
    </div>
    <div>
      <label>Wind direction</label>
      <select
        class="block w-full my-1 capitalize rounded"
        required
        v-model="observationData.windDir"
      >
        <option v-for="dir in directions" :value="dir" :key="dir">
          {{ getDirectionFromValue(dir) }}
        </option>
      </select>

      <label>Wind speed <span>m/s</span></label>
      <input
        v-model="observationData.windSpeed"
        required
        type="number"
        step="1"
        min="0"
        max="50"
        class="block w-full my-1 rounded"
      />
    </div>
    <div>
      <label>Weather</label>
      <input
        v-model="observationData.weather"
        type="text"
        required
        class="block w-full my-1 rounded"
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
      <select
        class="block w-full my-1 capitalize rounded"
        required
        v-model="observationData.cloudCover"
      >
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
        class="block w-full my-1 rounded"
        placeholder="ie cirrus, cumulus, CB..."
      />
    </div>
    <div>
      <label>Personal thoughts</label>
      <textarea
        v-model="observationData.personal"
        class="block w-full my-1 rounded"
        rows="5"
        placeholder="What do you want to remember from this day?"
      />
    </div>

    <cloud-button class="mx-auto">Save observation</cloud-button>
  </form>
</template>
