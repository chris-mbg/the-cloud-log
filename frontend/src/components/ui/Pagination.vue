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
  },
  setup(props, context) {
    const handleButtonClick = emitName => {
      context.emit(emitName)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }

    const handleNextPage = () => handleButtonClick("toNextPage")

    const handlePrevPage = () => handleButtonClick("toPrevPage")

    return { handleNextPage, handlePrevPage }
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center w-4/5 p-4 mx-auto space-x-6 text-xl sm:space-x-10"
  >
    <button
      @click="handlePrevPage"
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
      @click="handleNextPage"
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
