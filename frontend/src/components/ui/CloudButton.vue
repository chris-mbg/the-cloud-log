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
    :class="`flex items-center px-4 py-2 space-x-2 text-sm font-bold tracking-wide  uppercase rounded-lg ${
      primary
        ? ' bg-primary text-neutral hover:bg-secondary'
        : ' text-primary bg-secondary hover:bg-neutral'
    }`"
  >
    <slot></slot>
  </button>
</template>
