<script>
export default {
  props: {
    primary: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <button
    :class="`flex justify-center items-center px-6 py-2 space-x-2 text-sm text-center font-bold tracking-wide rounded ${
      danger
        ? `bg-red-500 text-neutral hover:brightness-75`
        : primary
        ? ' bg-primary text-neutral hover:bg-secondary'
        : ' text-neutral bg-secondary hover:brightness-75'
    } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
