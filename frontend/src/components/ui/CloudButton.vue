<script>
export default {
  props: {
    primary: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<template>
  <button
    :class="`flex justify-center items-center px-6 py-2 space-x-2 text-sm text-center font-bold tracking-wide rounded ${
      primary
        ? ' bg-primary text-neutral hover:bg-secondary'
        : ' text-primary bg-secondary hover:bg-neutral'
    }`"
  >
    <slot></slot>
  </button>
</template>
