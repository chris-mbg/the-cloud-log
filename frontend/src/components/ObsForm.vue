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
import { useRouter } from "vue-router"

export default {
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
        const result = await createObs({
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
          user: userData.getId.value,
          location: userLocation.value.id
        })

        router.push("/observations")
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
      handleSubmit,
      error,
      loading
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
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div class="col-span-2">
        <label>Date</label>
        <input
          v-model="observationData.date"
          required
          type="date"
          class="block w-full my-1 rounded"
          :min="new Date(Date.now() - 604800000).toISOString().split('T')[0]"
          :max="new Date().toISOString().split('T')[0]"
        />
      </div>
      <div>
        <label>Hour</label>
        <select
          class="block w-full my-1 rounded"
          v-model="observationData.hour"
          required
        >
          <option value="00">00</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
        </select>
      </div>
      <div>
        <label>Minute</label>
        <select
          class="block w-full my-1 rounded"
          v-model="observationData.minute"
          required
        >
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
