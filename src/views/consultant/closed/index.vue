<template>
  <div class="closed">
    <client-list :curTitle="curTitle" :confirmTitle="confirmTitle" :curStatus="curStatus" :nextStatus="nextStatus">
  </div>
</template>

<script>
  import ClientList from '@/components/ClientList.vue';
  export default {
    name: 'Closed',
    components: {
      ClientList,
    },
    data() {
      return {
        curTitle: '结佣',
        confirmTitle: '订单完成',
        curStatus: 4,
        nextStatus: 5
      };
    },
  };
</script>
