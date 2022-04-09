<script>
import {
  getDirectionFromValue,
  getCloudCoverFromValue
} from "../utils/weatherHelpers"
import { useUserData } from "../../providers/userProvider"

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
    county: String,
    ownerId: String
  },
  setup(props) {
    const { getId } = useUserData()

    return { getCloudCoverFromValue, getDirectionFromValue, getId }
  }
}
</script>

<template>
  <div class="flex p-4 m-4 shadow shadow-secondary group">
    <div class="grid w-4/5 grid-cols-1 gap-4 sm:grid-cols-2">
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
      <div
        v-if="Number(ownerId) === Number(getId)"
        class="flex content-center justify-start space-x-4 sm:col-span-2"
      >
        <font-awesome icon="comment-alt"></font-awesome>
        <p>
          {{ personal }}
        </p>
      </div>
    </div>
    <div
      class="flex-col items-end content-end hidden w-1/5 space-y-6 text-2xl text-secondary group-hover:flex"
    >
      <template v-if="Number(ownerId) === Number(getId)">
        <font-awesome icon="pen" class="cursor-pointer hover:text-primary" />
        <font-awesome icon="trash" class="cursor-pointer hover:text-red-600" />
      </template>
    </div>
  </div>
</template>