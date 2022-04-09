<script>
import ObsForm from "../components/ObsForm.vue"

export default {
  components: { ObsForm },
  setup() {}
}
</script>

<template>
  <div class="my-6 text-center">
    <h1 class="mb-2 text-2xl lg:text-4xl">How's the weather?</h1>
    <h1 class="text-lg lg:text-xl">Add a new observation</h1>
  </div>

  <obs-form></obs-form>
</template>
