import { computed, inject, provide, reactive } from "vue"

export const initUser = () => {
  const initialUserData = () => {
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"))
    console.log("Frloc storage", currentUser)
    if (!currentUser) {
      return { id: null, email: null, username: null, location: null }
    }
    return {
      id: currentUser.id,
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
  const getId = computed(() => user.id)

  // Actions
  const updateUsername = username => {
    user.username = username
  }
  const updateEmail = email => {
    user.email = email
  }
  const updateLocation = loc => {
    console.log("UpdateLocation", loc)
    user.location = loc
  }
  const updateId = id => {
    user.id = id
  }

  provide("getUsername", getUsername)
  provide("getEmail", getEmail)
  provide("getLocation", getLocation)
  provide("getId", getId)
  provide("updateUsername", updateUsername)
  provide("updateEmail", updateEmail)
  provide("updateLocation", updateLocation)
  provide("updateId", updateId)
}

export const useUserData = () => ({
  getUsername: inject("getUsername"),
  getEmail: inject("getEmail"),
  getLocation: inject("getLocation"),
  getId: inject("getId"),
  updateUsername: inject("updateUsername"),
  updateEmail: inject("updateEmail"),
  updateLocation: inject("updateLocation"),
  updateId: inject("updateId")
})
