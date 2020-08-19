<template>
  <div class="reported">
    <client-list :curTitle="curTitle" :confirmTitle="confirmTitle" :curStatus="curStatus" :nextStatus="nextStatus">
  </div>
</template>

<script>
  import ClientList from '@/components/ClientList.vue';
  export default {
    name: 'Reported',
    components: {
      ClientList,
    },
    data() {
      return {
        curTitle: '报备',
        confirmTitle: '到访',
        curStatus: 1,
        nextStatus: 2
      };
    },
  };
</script>
