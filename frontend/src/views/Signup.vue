<script>
import CloudButton from "../components/ui/CloudButton.vue"
import CloudInput from "../components/ui/CloudInput.vue"
import { useQuery, useResult, useMutation } from "@vue/apollo-composable"
import countiesData from "../data/counties.json"
import { computed, ref, watch, watchEffect } from "vue"
import locationsByCountyQuery from "../graphql/queries/locationsByCounty.query.graphql"
import locationsByCountyAndMunicipalityQuery from "../graphql/queries/locationsByCountyAndMunicipality.query.graphql"
import registerNewUser from "../graphql/mutations/registerNewUser.mutation.graphql"
import addLocationToUser from "../graphql/mutations/addLocationToUser.mutation.graphql"

export default {
  name: "Signup",
  components: { CloudButton, CloudInput },
  setup() {
    const email = ref("")
    const username = ref("")
    const password = ref("")

    const chosenCounty = ref(null)
    const chosenMunicipality = ref(null)
    const chosenLocality = ref(null)

    const { result: municipalityResult } = useQuery(
      locationsByCountyQuery,
      () => ({
        county: chosenCounty.value || ""
      })
    )
    const municipalities = useResult(
      municipalityResult,
      [],
      data => data.locations.data
    )

    const municipalitiesUnique = computed(
      () => new Set(municipalities.value.map(m => m.attributes.municipality))
    )

    const { result: localityResult } = useQuery(
      locationsByCountyAndMunicipalityQuery,
      () => ({
        county: chosenCounty.value || "",
        municipality: chosenMunicipality.value || ""
      })
    )

    const localities = useResult(
      localityResult,
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
          chosenMunicipality.value = null
          chosenLocality.value = null
        }
      }
    )
    watch(
      () => chosenMunicipality.value,
      () => {
        if (!chosenMunicipality.value) {
          chosenLocality.value = null
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
        chosenLocality.value
      )

      const result = await registerUser({
        email: email.value,
        username: username.value,
        password: password.value
      })

      console.log(result)

      window.localStorage.setItem("access-token", result.data.register.jwt)

      const result2 = await addUserLocation({
        userId: result.data.register.user.id,
        locationId: chosenLocality.value
      })

      console.log("Result 2", result2)
    }

    return {
      email,
      username,
      password,
      countiesData,
      chosenCounty,
      chosenMunicipality,
      chosenLocality,
      municipalities,
      localities,
      municipalitiesUnique,
      handleSignupSubmit
    }
  }
}
</script>

<template>
  <h1 class="my-6 text-lg text-center text-primary">
    Sign up to start register observations
  </h1>
  <form class="my-4 text-center" @submit.prevent="handleSignupSubmit">
    <label>Email</label>
    <input
      v-model="email"
      type="email"
      required
      placeholder="Email"
      class="block mx-auto my-2 rounded"
    />
    <label>Username</label>
    <input
      v-model="username"
      type="text"
      required
      placeholder="Username"
      class="block mx-auto my-2 rounded"
    />
    <label>Password</label>
    <input
      v-model="password"
      type="password"
      required
      placeholder="Password"
      class="block mx-auto my-2 rounded"
    />
    <p>Choose your location!</p>
    <label>County:</label>
    <select class="block mx-auto my-2 rounded" v-model="chosenCounty">
      <option value=""></option>
      <option v-for="county in countiesData" :value="county">
        {{ county }}
      </option>
    </select>
    <label>Municipality:</label>
    <select
      v-model="chosenMunicipality"
      class="block mx-auto my-2 rounded"
      v-if="chosenCounty"
    >
      <option value=""></option>
      <option v-for="m in municipalitiesUnique" :value="m">
        {{ m }}
      </option>
    </select>
    <label>Locality:</label>
    <select
      v-model="chosenLocality"
      class="block mx-auto my-2 rounded"
      v-if="chosenMunicipality && chosenCounty"
    >
      <option value=""></option>
      <option v-for="l in localities" :value="l.id" :key="l.id">
        {{ l.attributes.locality }}
      </option>
    </select>

    <cloud-button class="mx-auto my-2">Sign up</cloud-button>
  </form>
</template>
