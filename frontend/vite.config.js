import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import gql from "vite-plugin-simple-gql"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), gql()]
  // optimizeDeps: {
  //   include: ["@apollo/client/core", "@vue/apollo-composable"],
  //   exclude: ["@apollo/client"]
  // }
})
