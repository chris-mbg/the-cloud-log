import { ref } from "vue"

const useModal = () => {
  const showModal = ref(false)

  const openModal = () => (showModal.value = true)
  const closeModal = () => (showModal.value = false)

  return { showModal, openModal, closeModal }
}

export default useModal
