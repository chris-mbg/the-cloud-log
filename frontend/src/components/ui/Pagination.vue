<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    hasNextPage: {
      type: Boolean,
      required: true
    },
    lastPage: {
      type: Number
    }
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center w-4/5 p-4 mx-auto space-x-6 text-xl sm:space-x-10"
  >
    <button
      @click="$emit('toPrevPage')"
      type="button"
      :disabled="currentPage === 1"
      :class="`text-2xl cursor-pointer hover:text-secondary ${
        currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
      }`"
    >
      <font-awesome icon="chevron-circle-left" />
    </button>
    <div>
      Page: <span class="font-semibold">{{ currentPage }}</span> of
      <span class="font-semibold">{{ lastPage }}</span>
    </div>
    <button
      @click="$emit('toNextPage')"
      type="button"
      :class="`text-2xl cursor-pointer hover:text-secondary ${
        hasNextPage ? '' : 'opacity-50 cursor-not-allowed'
      }`"
      :disabled="!hasNextPage"
    >
      <font-awesome icon="chevron-circle-right" />
    </button>
  </div>
</template>
