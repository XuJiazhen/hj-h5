<template>
  <div class="client">
    <div class="main-title">
      <span>已推荐 {{ clientList.length }} 个客户</span>
    </div>
    <div class="client-list">
      <div class="client-item" v-for="(item, index) in clientList.length && clientList" :key="index">
        <div class="client-title">
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
        <div class="client-info">
          <span class="name">{{ item.customer_name }}</span>
          <span class="phone">{{ item.customer_phone }}</span>
          <span class="date">{{ item.plan_time | dateFilter }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getClientList } from '@/api/user.js';
  import NProgress from 'nprogress';
  import 'nprogress/nprogress.css';

  export default {
    name: 'Client',
    data() {
      return {
        clientList: [],
        color: '#2a765a',
      };
    },
    async created() {
      NProgress.inc(0.2);
      NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });
      NProgress.start();
      try {
        const res = await getClientList();
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
      statusFilter(v) {
        let state;
        switch (v) {
          case 0: {
            state = '未确认';
            break;
          }

          case 1: {
            state = '已报备';
            break;
          }

          case 2: {
            state = '已到访';
            break;
          }

          case 3: {
            state = '已成交';
            break;
          }

          case 4: {
            state = '已签约';
            break;
          }

          case 5: {
            state = '已作废';
            break;
          }
          case 6: {
            state = '已结佣';
            break;
          }
          default:
            break;
        }
        return state;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .client {
    width: 100%;
    margin-top: 56px;
    margin-bottom: 56px;
    overflow: scroll;

    .client-list {
      border-top: 10px solid var(--main-border-color);
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;

      .client-item {
        border-bottom: 10px solid var(--main-border-color);
        width: 95%;
        border-radius: 3px;
        background-color: var(--white);
        display: flex;
        flex-direction: column;
        padding: 0 15px;

        .client-title {
          border-bottom: 1px solid var(--main-border-color);
          padding: 10px 0;
        }

        .client-info {
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
