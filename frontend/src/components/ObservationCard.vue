<script>
import { defineComponent } from "vue"
import {
  getDirectionFromValue,
  getCloudCoverFromValue
} from "../utils/weatherHelpers"
import { useUserData } from "../providers/userProvider"
import useModal from "../composables/useModal"
import DeleteModal from "./DeleteModal.vue"

export default defineComponent({
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
  components: { DeleteModal },
  setup() {
    const { getId } = useUserData()

    const { showModal, openModal, closeModal } = useModal()

    return {
      getCloudCoverFromValue,
      getDirectionFromValue,
      getId,
      showModal,
      openModal,
      closeModal
    }
  }
})
</script>

<template>
  <div class="flex p-4 shadow shadow-secondary group">
    <div class="grid w-4/5 grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="flex content-center justify-start space-x-4">
        <span class="w-8 text-center">
          <font-awesome class="text-xl" icon="clock"></font-awesome>
        </span>
        <p>{{ new Date(time).toLocaleString("sv-SE") }}</p>
      </div>
      <div class="flex content-center justify-start space-x-4">
        <span class="w-8 text-center">
          <font-awesome icon="map-marker-alt" class="text-xl"></font-awesome>
        </span>
        <p>{{ city }}, {{ county }}</p>
      </div>
      <div class="flex content-center justify-start space-x-4">
        <span class="w-8 text-center">
          <font-awesome icon="wind" class="text-xl"></font-awesome>
        </span>
        <p>
          <span class="capitalize">{{
            getDirectionFromValue(wind_direction)
          }}</span>
          <span>{{ ", " }}{{ wind_speed }} m/s</span>
        </p>
      </div>
      <div class="flex content-center justify-start space-x-4">
        <span class="w-8 text-center">
          <font-awesome icon="thermometer-three-quarters" class="text-xl" />
        </span>
        <p>
          <span>{{ temperature }}</span
          ><span>&deg;C</span>
        </p>
      </div>
      <div class="flex content-center justify-start space-x-4">
        <span class="w-8 text-center">
          <font-awesome icon="cloud-sun-rain" class="text-xl"></font-awesome>
        </span>
        <p class="capitalize">{{ weather }}</p>
      </div>
      <div class="flex content-center justify-start space-x-4">
        <span class="w-8 text-center">
          <font-awesome
            icon="cloud"
            class="content-center text-lg"
          ></font-awesome>
        </span>
        <p>
          <span class="capitalize">{{
            getCloudCoverFromValue(cloud_cover)
          }}</span>
          <span v-if="cloud_types && cloud_types.length"
            >{{ " " }}({{ cloud_types }})</span
          >
        </p>
      </div>
      <div
        v-if="Number(ownerId) === Number(getId) && personal"
        class="flex items-center justify-start space-x-4 sm:col-span-2"
      >
        <span class="w-8 ml-2 text-center">
          <font-awesome icon="comment-alt" class="text-xl"></font-awesome>
        </span>
        <p>
          {{ personal }}
        </p>
      </div>
    </div>
    <div
      class="flex-col items-end content-end hidden w-1/5 space-y-6 text-lg sm:text-2xl text-secondary group-hover:flex"
    >
      <template v-if="Number(ownerId) === Number(getId)">
        <font-awesome
          icon="trash"
          class="cursor-pointer hover:text-red-600"
          @click="openModal()"
        />
      </template>
    </div>
  </div>

  <delete-modal
    :show="showModal"
    @close="closeModal()"
    :obsId="id"
  ></delete-modal>
</template>
