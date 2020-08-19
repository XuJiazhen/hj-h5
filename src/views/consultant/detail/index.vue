<template>
  <div class="detail">
    <div class="user-card">
      <div class="owner-title">
        <span>客户信息</span>
      </div>
      <div class="owner-info">
        <span class="name">姓名：{{ clientDetail && clientDetail.owner.realname }}</span>
        <span class="phone">电话：{{ clientDetail && clientDetail.owner.cellphone }}</span>
      </div>
      <div class="client-title">
        <span>推荐人信息</span>
      </div>
      <div class="client-info">
        <span class="name">姓名：{{ clientDetail && clientDetail.customer_name }}</span>
        <span class="phone">电话：{{ clientDetail && clientDetail.customer_phone }}</span>
        <span class="date">预约日期：{{ clientDetail && clientDetail.plan_time | dateFilter }}</span>
      </div>
    </div>

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
        console.log(res);
        if (res && res.data) {
          this.clientDetail = res.data.data;
        }
      } catch (error) {
        console.log('CREATED ERROR: ', error);
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
    filters: {
      dateFilter(v) {
        const date = new Date(String(v).replace(/-/g, '/'));
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .detail {
    width: 100%;
    overflow: scroll;
    margin-bottom: 56px;

    .user-card {
      width: 95%;
      margin: 0 auto;
      background-color: var(--white);
      border-radius: 3px;
      border-top: 10px solid var(--main-border-color);
      border-bottom: 10px solid var(--main-border-color);

      .owner-title,
      .client-title {
        width: 100%;
        border-bottom: 1px solid var(--main-bg-color);
        box-sizing: border-box;

        span {
          display: block;
          padding: 10px 5px;
          border-left: 10px solid var(--main-bg-color);
        }
      }

      .owner-info,
      .client-info {
        width: 100%;
        padding: 10px 15px;
        display: flex;
        flex-direction: column;

        span {
          padding: 10px 0;
          border-bottom: 1px solid var(--main-border-color);
        }
      }
    }

    .confirm-report {
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: var(--main-bg-color);
      color: var(--white);
      width: 95%;
      margin: 0 auto;
      border-radius: 3px;
      display: block;
    }
  }
</style>
