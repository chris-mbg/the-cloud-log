<script></script>

<template>
  <nav
    class="flex justify-between w-full p-6 bg-primary text-neutral font-heading"
  >
    <router-link to="/">
      <font-awesome icon="cloud"></font-awesome>
      <span class="ml-4">The Cloud Log</span>
    </router-link>
    <div class="space-x-4">
      <router-link to="/signup">Sign up</router-link>
      <router-link to="/observations">My obs</router-link>
      <router-link to="/new-obs">New obs</router-link>
      <router-link to="/logout">Logout</router-link>
    </div>
  </nav>
</template>
