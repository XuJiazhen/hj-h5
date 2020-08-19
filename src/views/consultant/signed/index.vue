<template>
  <div class="signed">
    <client-list :curTitle="curTitle" :confirmTitle="confirmTitle" :curStatus="curStatus" :nextStatus="nextStatus">
  </div>
</template>

<script>
  import ClientList from '@/components/ClientList.vue';
  export default {
    name: 'Signed',
    components: {
      ClientList,
    },
    data() {
      return {
        curTitle: '签约',
        confirmTitle: '结佣',
        curStatus: 4,
        nextStatus: 6
      };
    },
  };
</script>
