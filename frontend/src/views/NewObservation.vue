<script>
import ObsForm from "../components/ObsForm.vue"

export default {
  components: { ObsForm },
  setup() {}
}
</script>

<template>
  <div class="my-6 text-center">
    <h1 class="mb-2 text-2xl lg:text-4xl font-heading">How's the weather?</h1>
    <p class="text-lg lg:text-xl">Add a new observation</p>
  </div>

  <obs-form></obs-form>
</template>
