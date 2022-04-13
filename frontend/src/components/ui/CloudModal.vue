<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ["close"]
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center w-full h-screen overflow-hidden bg-smoke"
      @click.self="$emit('close')"
    >
      <div
        class="relative flex w-full max-w-2xl max-h-screen p-8 text-center rounded shadow bg-neutral"
      >
        <font-awesome
          icon="times-circle"
          class="absolute top-0 right-0 mx-2 my-2 text-2xl cursor-pointer text-primary hover:text-secondary"
          @click.prevent="$emit('close')"
        />
        <div class="w-full max-h-screen overflow-auto">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
