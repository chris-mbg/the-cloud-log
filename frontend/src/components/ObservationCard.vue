<script>
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
    personal: String
  }
}
</script>

<template>
  <div>
    <h1>Observation Card</h1>
    {{ weather }}
    {{ personal }}
  </div>
</template>
