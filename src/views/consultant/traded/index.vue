<template>
  <div class="traded">
    <client-list :curTitle="curTitle" :confirmTitle="confirmTitle" :curStatus="curStatus" :nextStatus="nextStatus">
  </div>
</template>

<script>
  import ClientList from '@/components/ClientList.vue';
  export default {
    name: 'Traded',
    components: {
      ClientList,
    },
    data() {
      return {
        curTitle: '成交',
        confirmTitle: '签约',
        curStatus: 3,
        nextStatus: 4
      };
    },
  };
</script>
