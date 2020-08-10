<template>
  <v-app style="background: #f4f4f4;">
    <router-view />
    <tab-bar />
  </v-app>
</template>

<script>
  import TabBar from '@/components/TabBar.vue';
  import { removeToken } from '@/utils/auth.js';
  export default {
    name: 'App',
    components: {
      TabBar,
    },
  };
</script>
