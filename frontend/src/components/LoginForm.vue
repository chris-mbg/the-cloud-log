<script>
import { ref } from "vue"
import CloudButton from "../components/ui/CloudButton.vue"
import { useMutation } from "@vue/apollo-composable"
import loginUser from "../graphql/mutations/loginUser.mutation.graphql"
import { useUserData } from "../../providers/userProvider"
import { useRouter } from "vue-router"

export default {
  components: { CloudButton },
  setup() {
    const router = useRouter()
    const userData = useUserData()
    console.log("User?? :: ", userData.getEmail.value)

    const email = ref("")
    const password = ref("")

    const { mutate: login } = useMutation(loginUser)

    const handleLoginSubmit = async () => {
      try {
        const result = await login({
          email: email.value,
          password: password.value
        })
        window.localStorage.setItem("access-token", result.data.login.jwt)
        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(result.data.login.user)
        )
        console.log("Login: ", result)

        userData.updateEmail(result.data.login.user.email)
        userData.updateUsername(result.data.login.user.username)
        userData.updateLocation(result.data.login.user.location.data)

        router.push({ name: "Home" })
      } catch (err) {
        console.log(err)
      }
    }

    return { email, password, handleLoginSubmit }
  }
}
</script>

<template>
  <form
    class="w-5/6 mx-auto space-y-4 text-left lg:w-1/3"
    @submit.prevent="handleLoginSubmit"
  >
    <div>
      <label>Email</label>
      <input
        v-model="email"
        type="email"
        required
        placeholder="Email"
        class="block w-full my-1 rounded"
      />
    </div>
    <div>
      <label>Password</label>
      <input
        v-model="password"
        type="password"
        required
        placeholder="Password"
        class="block w-full my-1 rounded"
      />
    </div>

    <cloud-button class="mx-auto">Login</cloud-button>
    <p class="my-4 text-sm text-center">
      Not registered?
      <router-link to="/signup" class="underline">Sign up here</router-link>
    </p>
  </form>
</template>
