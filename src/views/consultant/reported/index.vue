<template>
  <div class="reported">
    <div class="main-title">
      <span>{{ clientList.length }} 个客户已报备</span>
    </div>
    <div class="client-list">
      <div class="client-item" v-for="(item, index) in clientList" :key="index">
        <div class="client-title">
          <v-chip :color="color" label text-color="white" small>
            <v-icon left>mdi-label</v-icon>
            {{ item.status | statusFilter }}
          </v-chip>
        </div>
        <div class="client-info">
          <span class="name">{{ item.customer_name }}</span>
          <span class="phone">{{ item.customer_phone }}</span>
          <span class="date">{{ item.plan_time | dateFliter }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getClientList } from '@/api/user.js';
  export default {
    name: 'Reported',
    data() {
      return {
        clientList: [],
        color: '#2a765a',
      };
    },
    async created() {
      try {
        const res = await getClientList();
        if (res && res.data) {
          this.clientList = res.data.list.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    filters: {
      dateFliter(v) {
        const date = new Date(v);
        return `${date.getFullYear()}年-${date.getMonth() + 1}月-${date.getDate()}日`;
      },
      statusFilter(v) {
        return v === 0 ? '未确认' : '已确认';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .reported {
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
