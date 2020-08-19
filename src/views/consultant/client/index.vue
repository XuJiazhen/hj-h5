<template>
  <div class="client-list">
    <div class="main-title">
      <span>共 {{ clientList.length }} 个客户</span>
    </div>
    <div class="main-list">
      <div class="list-item" v-for="(item, index) in clientList.length && clientList" :key="index">
        <div class="item-title">
          <template v-if="item.status === 0">
            <v-chip color="#2a765a" label text-color="white" small>
              <v-icon left>mdi-label</v-icon>
              未确认
            </v-chip>
          </template>
          <template v-if="item.status === 1">
            <v-chip color="#cfa26b" label text-color="white" small>
              <v-icon left>mdi-label</v-icon>
              已报备
            </v-chip>
          </template>

          <template v-if="item.status === 2">
            <v-chip color="#6a867a" label text-color="white" small>
              <v-icon left>mdi-label</v-icon>
              已到访
            </v-chip>
          </template>

          <template v-if="item.status === 3">
            <v-chip color="#888e84" label text-color="white" small>
              <v-icon left>mdi-label</v-icon>
              已成交
            </v-chip>
          </template>

          <template v-if="item.status === 4">
            <v-chip color="#ae887b" label text-color="white" small>
              <v-icon left>mdi-label</v-icon>
              已签约
            </v-chip>
          </template>

          <template v-if="item.status === 5">
            <v-chip color="#8793ab" label text-color="white" small>
              <v-icon left>mdi-label</v-icon>
              已结佣
            </v-chip>
          </template>

          <template v-if="item.status === 6">
            <v-chip color="error" label text-color="white" small>
              <v-icon left>mdi-label</v-icon>
              已作废
            </v-chip>
          </template>
        </div>
        <div class="item-info">
          <span class="name">{{ item.customer_name }}</span>
          <span class="phone">{{ item.customer_phone }}</span>
          <span class="date">{{ item.plan_time | dateFilter }}</span>
        </div>
      </div>
    </div>
    <v-snackbar v-model="snackbar" timeout="1000" top :color="color" centered>{{ message }}</v-snackbar>
  </div>
</template>

<script>
  import { getReportedList, updateClientState } from '@/api/user.js';
  import NProgress from 'nprogress';
  import 'nprogress/nprogress.css';

  export default {
    name: 'client-list',
    data() {
      return {
        clientList: [],
        snackbar: false,
        color: '',
        message: '',
      };
    },
    async created() {
      NProgress.inc(0.2);
      NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });
      NProgress.start();
      try {
        const res = await getReportedList('all');
        if (res && res.data) {
          this.clientList = res.data.list.data;
          NProgress.done();
        }
      } catch (error) {
        console.log(error);
      }
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
  .client-list {
    width: 100%;
    margin-top: 56px;
    margin-bottom: 56px;
    overflow: scroll;

    .main-list {
      border-top: 10px solid var(--main-border-color);
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;

      .list-item {
        border-bottom: 10px solid var(--main-border-color);
        width: 95%;
        border-radius: 3px;
        background-color: var(--white);
        display: flex;
        flex-direction: column;
        padding: 0 15px;

        .item-title {
          border-bottom: 1px solid var(--main-border-color);
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
          align-content: center;
        }

        .item-info {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          text-align: center;
          padding: 10px 0;
        }
      }

      .list-item:last-child {
        border-bottom: none;
      }
    }
  }
</style>
