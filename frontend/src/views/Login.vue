<script>
import { defineComponent } from "vue"
import LoginForm from "../components/LoginForm.vue"
import CloudLogo from "../components/CloudLogo.vue"

export default defineComponent({
  components: { LoginForm, CloudLogo }
})
</script>

<template>
  <cloud-logo></cloud-logo>

  <hr class="m-6 border-t-1 border-primary" />

  <login-form></login-form>
</template>
