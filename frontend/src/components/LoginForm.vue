<script>
import { defineComponent, ref } from "vue"
import CloudButton from "../components/ui/CloudButton.vue"
import { useMutation } from "@vue/apollo-composable"
import loginUser from "../graphql/mutations/loginUser.mutation.graphql"
import { useUserData } from "../providers/userProvider"
import { useRouter } from "vue-router"

export default defineComponent({
  components: { CloudButton },
  setup() {
    const router = useRouter()
    const userData = useUserData()

    const email = ref("")
    const password = ref("")

    const { mutate: login, error, loading } = useMutation(loginUser)

    const handleLoginSubmit = async () => {
      try {
        const result = await login({
          email: email.value,
          password: password.value
        })
        window.localStorage.setItem("access-token", result.data.login.jwt)
        window.localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: result.data.login.user.id,
            email: result.data.login.user.email,
            username: result.data.login.user.username,
            location: result.data.login.user.location.data
          })
        )

        userData.updateId(result.data.login.user.id)
        userData.updateEmail(result.data.login.user.email)
        userData.updateUsername(result.data.login.user.username)
        userData.updateLocation(result.data.login.user.location.data)

        router.push({ name: "Home" })
      } catch (err) {
        console.log(err)
      }
    }

    return { email, password, handleLoginSubmit, error, loading }
  }
})
</script>

<template>
  <form
    class="w-5/6 mx-auto space-y-4 text-left lg:w-1/3"
    @submit.prevent="handleLoginSubmit"
  >
    <div>
      <label>Email</label>
      <input v-model="email" type="email" required placeholder="Email" />
    </div>
    <div>
      <label>Password</label>
      <input
        v-model="password"
        type="password"
        required
        placeholder="Password"
      />
    </div>

    <cloud-button class="mx-auto" :disabled="loading">Login</cloud-button>

    <div
      class="p-4 text-center text-red-600 border border-red-600"
      v-if="error"
    >
      <p>Error: {{ error.message }}</p>
    </div>

    <p class="my-4 text-sm text-center">
      Not registered?
      <router-link to="/signup" class="underline">Sign up here</router-link>
    </p>
  </form>
</template>
