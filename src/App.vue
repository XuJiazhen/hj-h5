<template>
  <v-app style="background: #f4f4f4;">
    <router-view />
  </v-app>
</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style>
  #nprogress .bar {
    background: var(--main-bg-color) !important;
  }
</style>
