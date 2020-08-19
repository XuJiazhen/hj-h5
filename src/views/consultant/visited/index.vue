<template>
  <div class="visited">
    <client-list :curTitle="curTitle" :confirmTitle="confirmTitle" :curStatus="curStatus" :nextStatus="nextStatus">
  </div>
</template>

<script>
  import ClientList from '@/components/ClientList.vue';
  export default {
    name: 'Visited',
    components: {
      ClientList,
    },
    data() {
      return {
        curTitle: '到访',
        confirmTitle: '成交',
        curStatus: 2,
        nextStatus: 3
      };
    },
  };
</script>
