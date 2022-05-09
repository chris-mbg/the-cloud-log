import { ref } from "vue"

const usePagination = () => {
  const page = ref(1)
  const hasNextPage = ref(true)
  const lastPage = ref(null)

  const handleNextPage = () => (page.value = page.value + 1)
  const handlePrevPage = () =>
    (page.value = page.value === 1 ? 1 : page.value - 1)

  return { page, hasNextPage, lastPage, handleNextPage, handlePrevPage }
}

export default usePagination
