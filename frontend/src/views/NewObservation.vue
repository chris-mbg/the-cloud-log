<script>
import ObsForm from "../components/ObsForm.vue"

export default {
  components: { ObsForm },
  setup() {}
}
</script>

<template>
  <div class="my-4 text-center">
    <h1 class="text-2xl">What weather is it?</h1>
    <h1 class="text-xl">Add a new observation</h1>
  </div>

  <obs-form></obs-form>
</template>
