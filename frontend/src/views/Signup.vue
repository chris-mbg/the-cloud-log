<script>
import CloudButton from "../components/ui/CloudButton.vue"
import CloudInput from "../components/ui/CloudInput.vue"
import { useQuery, useResult, useMutation } from "@vue/apollo-composable"
import countiesData from "../data/counties.json"
import { ref, watch } from "vue"
// import locationsByCountyQuery from "../graphql/locationsByCounty.query.graphql"
import gql from "graphql-tag"

export default {
  name: "Signup",
  components: { CloudButton, CloudInput },
  setup() {
    const chosenCounty = ref(null)
    const chosenMunicipality = ref(null)
    const chosenLocality = ref(null)

    // const municipalities = useResult(municipalityResult, null, /* get all municipalities from result */)
    // const { result: localityResult } = useQuery(/* the locality query from county and municipality */)
    // const localities = useResult(localityResult, null, /* get all municipalities from result */)

    watch(chosenCounty, () => {
      if (chosenCounty.value) {
        console.log("County:", chosenCounty.value)
        const { result: municipalityResult } = useQuery(gql`
          query locationsByCounty {
            locations(filters: { county: { eq: "Värmland" } }) {
              data {
                id
                attributes {
                  county
                  municipality
                  locality
                }
              }
            }
          }
        `)
        // locationsByCountyQuery(chosenCounty)
        console.log(municipalityResult)
      }
    })

    return {
      countiesData,
      chosenCounty,
      chosenMunicipality,
      chosenLocality
      // municipalities,
      // localities
    }
  }
}
</script>

<template>
  <h1 class="my-6 text-lg text-center text-primary">
    Sign up to start register observations
  </h1>
  <form class="my-4 text-center">
    <label>Email</label>
    <input
      type="email"
      required
      placeholder="Email"
      class="block mx-auto my-2 rounded"
    />
    <input
      type="text"
      required
      placeholder="Username"
      class="block mx-auto my-2 rounded"
    />
    <input
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

    <select v-if="chosenCounty"></select>

    <cloud-button class="mx-auto my-2">Sign up</cloud-button>
  </form>
</template>
