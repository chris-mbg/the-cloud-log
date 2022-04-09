<script>
import ObservationCard from "./ObservationCard.vue"

export default {
  props: {
    obsList: {
      required: true,
      type: Array
    }
  },
  components: { ObservationCard }
}
</script>

<template>
  <div
    v-if="obsList.length"
    class="container grid max-w-4xl grid-cols-1 gap-2 mx-auto"
  >
    <observation-card
      v-for="obs in obsList"
      :key="obs.id"
      :id="obs.id"
      :time="obs.attributes.observation_time"
      :temperature="obs.attributes.temperature"
      :weather="obs.attributes.weather"
      :wind_direction="obs.attributes.wind_direction"
      :wind_speed="obs.attributes.wind_speed"
      :cloud_cover="obs.attributes.cloud_cover"
      :cloud_types="obs.attributes.cloud_types"
      :personal="obs.attributes.personal"
      :city="obs.attributes.location.data.attributes.city"
      :county="obs.attributes.location.data.attributes.county"
      :ownerId="obs.attributes.owner.data.id"
    />
  </div>
</template>
