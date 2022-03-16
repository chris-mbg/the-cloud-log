import { computed, inject, provide, reactive } from "vue"

export const initUser = () => {
  const initialUserData = () => {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"))
    if (!currentUser) {
      return { email: null, username: null, location: null }
    }
    return {
      email: currentUser.email,
      username: currentUser.username,
      location: currentUser.location
    }
  }
  const user = reactive(initialUserData())

  console.log("From userprovider.js:: ", user)
  // Getters
  const getUsername = computed(() => user.username)
  const getEmail = computed(() => user.email)
  const getLocation = computed(() => user.location)

  // Actions
  const updateUsername = username => {
    user.username = username
  }
  const updateEmail = email => {
    user.email = email
  }
  const updateLocation = loc => {
    user.location = loc
  }

  provide("getUsername", getUsername)
  provide("getEmail", getEmail)
  provide("getLocation", getLocation)
  provide("updateUsername", updateUsername)
  provide("updateEmail", updateEmail)
  provide("updateLocation", updateLocation)
}

export const useUserData = () => ({
  getUsername: inject("getUsername"),
  getEmail: inject("getEmail"),
  getLocation: inject("getLocation"),
  updateUsername: inject("updateUsername"),
  updateEmail: inject("updateEmail"),
  updateLocation: inject("updateLocation")
})
