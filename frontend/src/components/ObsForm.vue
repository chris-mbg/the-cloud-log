<script>
import { ref, computed } from "vue"
import CloudButton from "../components/ui/CloudButton.vue"
import { useMutation } from "@vue/apollo-composable"
import {
  getDirectionFromValue,
  getCloudCoverFromValue,
  weatherTypes
} from "../utils/wheaterHelpers"
import { useUserData } from "../../providers/userProvider"

export default {
  components: { CloudButton },
  setup() {
    const userData = useUserData()
    const userLocation = computed(() => userData.getLocation)
    console.log(userLocation.value)
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const cloudCover = ["SKC", "FEW", "SCT", "BKN", "OVC"]

    return {
      userLocation,
      directions,
      cloudCover,
      weatherTypes,
      getDirectionFromValue,
      getCloudCoverFromValue
    }
  }
}
</script>

<template>
  <form class="w-5/6 mx-auto space-y-4 text-left lg:w-1/3" @submit.prevent="">
    <div>
      <label>Location</label>
      <span>{{ userLocation.attributes.city }}</span>
      <span>{{ userLocation.attributes.county }}</span>
      <input readonly :value="userLocation" class="block w-full my-1 rounded" />
    </div>
    <div>
      <label>Time of observation</label>
      <input
        required
        type="datetime-local"
        class="block w-full my-1 rounded"
        :min="new Date(Date.now() - 604800000).toISOString()"
        :max="new Date(Date.now()).toISOString()"
      />
    </div>
    <div>
      <label>Date</label>
      <input
        required
        type="date"
        class="block w-full my-1 rounded"
        :min="new Date(Date.now() - 604800000).toISOString()"
        :max="new Date(Date.now()).toISOString()"
      />
      <label>Time</label>
      <input
        required
        type="time"
        class="block w-full my-1 rounded"
        :step="60 * 30"
      />
    </div>
    <div>
      <label>Temperature <span>&deg;C</span></label>
      <input
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
      <select class="block w-full my-1 capitalize rounded" required>
        <option v-for="dir in directions" :value="dir" :key="dir">
          {{ getDirectionFromValue(dir) }}
        </option>
      </select>

      <label>Wind speed <span>m/s</span></label>
      <input
        required
        type="number"
        step="0.1"
        min="0"
        max="50"
        class="block w-full my-1 rounded"
      />
    </div>
    <div>
      <label>Weather</label>
      <input
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
      <select class="block w-full my-1 capitalize rounded" required>
        <option v-for="c in cloudCover" :value="c" :key="c">
          {{ getCloudCoverFromValue(c) }}
        </option>
      </select>
    </div>
    <div>
      <label>Cloud types</label>
      <input
        type="text"
        class="block w-full my-1 rounded"
        placeholder="ie cirrus, cumulus, CB..."
      />
    </div>
    <div>
      <label>Personal thoughts</label>
      <textarea
        class="block w-full my-1 rounded"
        rows="5"
        placeholder="What do you want to remember from this day?"
      />
    </div>

    <cloud-button class="mx-auto">Save observation</cloud-button>
  </form>
</template>
