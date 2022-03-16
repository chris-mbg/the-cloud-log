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

export default {
  name: "Signup",
  components: { CloudButton, CloudInput },
  setup() {
    const router = useRouter()
    const email = ref("")
    const username = ref("")
    const password = ref("")

    const chosenCounty = ref(null)
    const chosenLocation = ref(null)

    const { result: locationsResult } = useQuery(
      locationsByCountyQuery,
      () => ({
        county: chosenCounty.value || ""
      })
    )

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

    const { mutate: registerUser } = useMutation(registerNewUser)
    const { mutate: addUserLocation } = useMutation(addLocationToUser)

    const handleSignupSubmit = async () => {
      console.log(
        "User data",
        email.value,
        username.value,
        password.value,
        chosenLocation.value
      )
      try {
        const result = await registerUser({
          email: email.value,
          username: username.value,
          password: password.value
        })

        console.log("Reg result", result)

        window.localStorage.setItem("access-token", result.data.register.jwt)
        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(result.data.register.user)
        )

        const result2 = await addUserLocation(
          {
            userId: result.data.register.user.id,
            locationId: chosenLocation.value
          },
          {
            context: {
              headers: {
                Authorization: `Bearer ${result.data.register.jwt}`
              }
            }
          }
        )

        console.log("Result 2", result2)
        router.push({ name: "Home" })
      } catch (err) {
        console.log("Error", err)
      }
    }

    return {
      email,
      username,
      password,
      countiesData,
      chosenCounty,
      chosenLocation,
      locations,
      handleSignupSubmit
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
      <p class="text-center">Choose your location!</p>
      <label>County:</label>
      <select class="block w-full my-1 rounded" v-model="chosenCounty">
        <option value=""></option>
        <option v-for="county in countiesData" :value="county">
          {{ county }}
        </option>
      </select>
      <div v-if="chosenCounty">
        <label>City:</label>
        <select v-model="chosenLocation" class="block w-full my-1 rounded">
          <option value=""></option>
          <option v-for="l in locations" :value="l.id" :key="l.id">
            {{ l.attributes.city }}
          </option>
        </select>
      </div>
    </div>

    <cloud-button class="mx-auto my-2">Sign up</cloud-button>
  </form>
</template>
