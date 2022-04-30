<script>
import { useRouter } from "vue-router"
import CloudButton from "../components/ui/CloudButton.vue"
import CloudInput from "../components/ui/CloudInput.vue"
import { useQuery, useResult, useMutation } from "@vue/apollo-composable"
import countiesData from "../data/counties.json"
import { ref, watch } from "vue"
import locationsByCountyQuery from "../graphql/queries/locationsByCounty.query.graphql"
import registerNewUser from "../graphql/mutations/registerNewUser.mutation.graphql"
import addLocationToUser from "../graphql/mutations/addLocationToUser.mutation.graphql"
import { useUserData } from "../providers/userProvider"

export default {
  name: "Signup",
  components: { CloudButton, CloudInput },
  setup() {
    const router = useRouter()

    const email = ref("")
    const username = ref("")
    const password = ref("")
    const confirmPassword = ref("")

    const chosenCounty = ref(null)
    const chosenLocation = ref(null)

    const formError = ref(null)

    const setUserData = useUserData()

    const {
      result: locationsResult,
      error: queryError,
      loading: queryLoading
    } = useQuery(locationsByCountyQuery, () => ({
      county: chosenCounty.value || ""
    }))

    const locations = useResult(
      locationsResult,
      [],
      data => data.locations.data
    )

    watch(
      () => chosenCounty.value,
      () => {
        if (chosenCounty.value) {
          console.log("County:", chosenCounty.value)
        }

        if (!chosenCounty.value) {
          chosenLocation.value = null
        }
      }
    )

    const {
      mutate: registerUser,
      loading: registerLoading,
      error: registerError
    } = useMutation(registerNewUser)
    const {
      mutate: addUserLocation,
      loading: addLocationLoading,
      error: addLocationError
    } = useMutation(addLocationToUser)

    const handleSignupSubmit = async () => {
      formError.value = null

      if (password.value !== confirmPassword.value) {
        formError.value = "The passwords must match!"
        return
      } else if (password.value.length < 6) {
        formError.value = "The password must be at least 6 characters"
        return
      }
      try {
        const signupResult = await registerUser({
          email: email.value,
          username: username.value,
          password: password.value
        })

        window.localStorage.setItem(
          "access-token",
          signupResult.data.register.jwt
        )

        const addLocResult = await addUserLocation(
          {
            userId: signupResult.data.register.user.id,
            locationId: chosenLocation.value
          },
          {
            context: {
              headers: {
                Authorization: `Bearer ${signupResult.data.register.jwt}`
              }
            }
          }
        )

        setUserData.updateEmail(
          addLocResult.data.updateUsersPermissionsUser.data.attributes.email
        )
        setUserData.updateUsername(
          addLocResult.data.updateUsersPermissionsUser.data.attributes.username
        )
        setUserData.updateLocation(
          addLocResult.data.updateUsersPermissionsUser.data.attributes.location
            .data
        )
        setUserData.updateId(
          addLocResult.data.updateUsersPermissionsUser.data.id
        )

        window.localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: addLocResult.data.updateUsersPermissionsUser.data.id,
            email:
              addLocResult.data.updateUsersPermissionsUser.data.attributes
                .email,
            username:
              addLocResult.data.updateUsersPermissionsUser.data.attributes
                .username,
            location:
              addLocResult.data.updateUsersPermissionsUser.data.attributes
                .location.data
          })
        )
        router.push({ name: "Home" })
      } catch (err) {
        console.log(err)
      }
    }

    return {
      email,
      username,
      password,
      confirmPassword,
      countiesData,
      chosenCounty,
      chosenLocation,
      locations,
      handleSignupSubmit,
      queryError,
      queryLoading,
      registerError,
      registerLoading,
      addLocationError,
      addLocationLoading,
      formError
    }
  }
}
</script>

<template>
  <h1 class="my-6 text-lg text-center text-primary">
    Sign up to start register observations
  </h1>
  <form
    class="w-5/6 mx-auto space-y-6 text-left lg:w-1/3"
    @submit.prevent="handleSignupSubmit"
  >
    <div>
      <label>Email</label>
      <input
        v-model="email"
        type="email"
        required
        class="block w-full my-1 rounded"
      />
    </div>
    <div>
      <label>Username</label>
      <input
        v-model="username"
        type="text"
        required
        class="block w-full my-1 rounded"
      />
    </div>
    <div>
      <label>Password</label>
      <input
        v-model="password"
        type="password"
        required
        class="block w-full my-1 rounded"
      />
    </div>
    <div>
      <label>Confirm password</label>
      <input
        v-model="confirmPassword"
        type="password"
        required
        class="block w-full my-1 rounded"
      />
    </div>
    <div>
      <p class="text-center">Choose your location!</p>
      <label>County:</label>
      <select class="block w-full my-1 rounded" v-model="chosenCounty" required>
        <option value=""></option>
        <option v-for="county in countiesData" :value="county">
          {{ county }}
        </option>
      </select>
      <div v-if="chosenCounty">
        <label>City:</label>
        <select
          v-model="chosenLocation"
          class="block w-full my-1 rounded"
          required
        >
          <option value=""></option>
          <option v-for="l in locations" :value="l.id" :key="l.id">
            {{ l.attributes.city }}
          </option>
        </select>
      </div>
    </div>

    <cloud-button
      class="mx-auto my-2"
      :disabled="queryLoading || registerLoading || addLocationLoading"
      >Sign up</cloud-button
    >

    <div
      class="p-4 text-center text-red-600 border border-red-600"
      v-if="queryError || registerError || addLocationError || formError"
    >
      <p v-if="queryError">Error: {{ queryError.message }}</p>
      <p v-if="registerError">Error: {{ registerError.message }}</p>
      <p v-if="addLocationError">Error: {{ addLocationError.message }}</p>
      <p v-if="formError">Error: {{ formError }}</p>
    </div>
  </form>
</template>
