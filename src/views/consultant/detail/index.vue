<template>
  <div class="detail">
    CLIENT DETAIL.
    <button class="confirm-report" @click="onConfirm" :disabled="disabled">确认用户报备</button>
    <v-snackbar v-model="snackbar" timeout="1000" top :color="color" centered>{{ message }}</v-snackbar>
  </div>
</template>

<script>
  import { getClientDetail, updateClientState } from '@/api/user.js';
  export default {
    name: 'Detail',
    data() {
      return {
        id: '',
        status: 1,
        clientDetail: null,
        snackbar: false,
        message: '',
        color: '',
        disabled: false,
      };
    },
    async created() {
      this.id = this.$route.params.id;
      try {
        const res = await getClientDetail(this.$route.params.id);
        if (res && res.data) {
          this.clientDetail = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      async onConfirm() {
        try {
          const res = await updateClientState(this.id, this.status);
          if (res && res.status === 200) {
            console.log(res);
            this.message = res.data.msg;
            this.color = 'success';
            this.snackbar = true;
            this.disabled = true;
          } else {
            this.message = '操作失败';
            this.color = 'error';
            this.snackbar = true;
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .detail {
    width: 100%;
    overflow: scroll;
    margin-bottom: 56px;

    .confirm-report {
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: var(--main-bg-color);
      color: var(--white);
      width: 100%;
    }
  }
</style>
