<script>
import { ref } from "vue"
import CloudButton from "../components/ui/CloudButton.vue"
import { useMutation } from "@vue/apollo-composable"
import loginUser from "../graphql/mutations/loginUser.mutation.graphql"

export default {
  components: { CloudButton },
  setup() {
    const email = ref("")
    const password = ref("")

    const { mutate: login } = useMutation(loginUser)

    const handleLoginSubmit = async () => {
      const result = await login({
        email: email.value,
        password: password.value
      })
      window.localStorage.setItem("access-token", result.data.login.jwt)
      console.log("Login: ", result)
    }

    return { email, password, handleLoginSubmit }
  }
}
</script>

<template>
  <form class="text-center" @submit.prevent="handleLoginSubmit">
    <label>Email</label>
    <input
      v-model="email"
      type="email"
      required
      placeholder="Email"
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
    <cloud-button class="mx-auto">Login</cloud-button>
    <p class="my-4 text-sm">
      Not registered?
      <router-link to="/signup" class="underline">Sign up here</router-link>
    </p>
  </form>
</template>
