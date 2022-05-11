<script>
import CloudModal from "./ui/CloudModal.vue"
import CloudButton from "./ui/CloudButton.vue"
import { useMutation } from "@vue/apollo-composable"
import deleteObservationMutation from "../graphql/mutations/deleteObservation.mutation.graphql"
import { defineComponent } from "vue"

export default defineComponent({
  components: { CloudModal, CloudButton },
  emits: ["close"],
  props: {
    show: {
      type: Boolean,
      required: true
    },
    obsId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const {
      mutate: deleteObs,
      error,
      loading
    } = useMutation(deleteObservationMutation, {
      variables: {
        id: props.obsId
      }
    })

    const handleDelete = async () => await deleteObs()

    return { handleDelete, error, loading }
  }
})
</script>

<template>
  <cloud-modal :show="show" @close="$emit('close')">
    <div>
      <p v-if="loading">Deleting your observation...</p>
      <p v-else-if="error" class="text-red-600 border">
        Error: {{ error.message }}
      </p>
      <div v-else>
        <p class="text-lg">Do you really want to delete this observation?</p>

        <div class="flex items-center justify-center my-4 space-x-4">
          <cloud-button :danger="true" @click="handleDelete"
            >Delete</cloud-button
          >
          <cloud-button :primary="false" @click="$emit('close')"
            >Cancel</cloud-button
          >
        </div>
      </div>
    </div>
  </cloud-modal>
</template>
