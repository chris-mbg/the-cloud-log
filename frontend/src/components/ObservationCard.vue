<script>
import {
  getDirectionFromValue,
  getCloudCoverFromValue
} from "../utils/weatherHelpers"

export default {
  props: {
    id: String,
    time: String,
    temperature: Number,
    weather: String,
    wind_direction: String,
    wind_speed: Number,
    cloud_cover: String,
    cloud_types: String,
    personal: String,
    city: String,
    county: String
  },
  setup() {
    return { getCloudCoverFromValue, getDirectionFromValue }
  }
}
</script>

<template>
  <div
    class="grid grid-cols-1 gap-4 p-4 m-4 border shadow-sm sm:grid-cols-2 shadow-secondary"
  >
    <div class="flex content-center justify-start space-x-4">
      <font-awesome class="text-xl" icon="clock"></font-awesome>
      <p>{{ new Date(time).toLocaleString("sv-SE") }}</p>
    </div>
    <div class="flex content-center justify-start space-x-4">
      <font-awesome icon="map-marker-alt"></font-awesome>
      <p>{{ city }}, {{ county }}</p>
    </div>
    <div class="flex content-center justify-start space-x-4">
      <font-awesome icon="wind"></font-awesome>
      <p>
        <span class="capitalize">{{
          getDirectionFromValue(wind_direction)
        }}</span>
        <span>{{ ", " }}{{ wind_speed }} m/s</span>
      </p>
    </div>
    <div class="flex content-center justify-start space-x-4">
      <font-awesome icon="thermometer-three-quarters" />
      <p>
        <span>{{ temperature }}</span
        ><span>&deg;C</span>
      </p>
    </div>
    <div class="flex content-center justify-start space-x-4">
      <font-awesome icon="cloud-sun-rain"></font-awesome>
      <p class="capitalize">{{ weather }}</p>
    </div>
    <div class="flex content-center justify-start space-x-4">
      <font-awesome icon="cloud-sun"></font-awesome>
      <p>
        <span class="capitalize">{{
          getCloudCoverFromValue(cloud_cover)
        }}</span>
        <span>{{ " " }}({{ cloud_types }})</span>
      </p>
    </div>
    <div class="flex content-center justify-start space-x-4 sm:col-span-2">
      <font-awesome icon="comment-alt"></font-awesome>
      <p>
        {{ personal }}
      </p>
    </div>
  </div>
</template>
