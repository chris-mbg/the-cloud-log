<script>
import CloudModal from "./ui/CloudModal.vue"
import CloudButton from "./ui/CloudButton.vue"

export default {
  components: { CloudModal, CloudButton },
  emits: ["close"],
  props: {
    show: {
      type: Boolean,
      required: true
    },
    obsId: {
      type: String
    }
  },
  setup() {
    const handleDelete = () => {
      console.log("Delete...")
    }

    return { handleDelete }
  }
}
</script>

<template>
  <cloud-modal :show="show" @close="$emit('close')">
    <div>
      <p class="text-lg">Do you really want to delete this observation?</p>

      <div class="flex items-center justify-center my-4 space-x-4">
        <cloud-button :danger="true" @click="handleDelete">Delete</cloud-button>
        <cloud-button :primary="false" @click="$emit('close')"
          >Cancel</cloud-button
        >
      </div>
    </div>
  </cloud-modal>
</template>
