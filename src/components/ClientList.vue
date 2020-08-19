<template>
  <div class="client-list">
    <div class="main-title">
      <span>{{ clientList.length }} 个客户已{{ curTitle }}</span>
    </div>
    <div class="main-list">
      <div class="list-item" v-for="(item, index) in clientList.length && clientList" :key="index">
        <div class="item-title">
          <v-chip color="#1a3751" label text-color="white" small>
            <v-icon left>mdi-label</v-icon>
            已{{ curTitle }}
          </v-chip>
          <v-chip color="teal" text-color="white" small label @click="onConfirm(item.id, index)">
            <v-avatar left>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-avatar>
            确认用户{{ confirmTitle }}
          </v-chip>
          <v-chip color="error" text-color="white" small label @click="onDelete(item.id, index)">
            <v-avatar left>
              <v-icon>mdi-delete-circle</v-icon>
            </v-avatar>
            作废
          </v-chip>
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
    props: {
      curTitle: {
        type: String,
        required: true,
      },
      confirmTitle: {
        type: String,
        required: true,
      },
      curStatus: {
        type: Number,
        required: true,
      },
      nextStatus: {
        type: Number,
        required: true,
      },
      nextStatus: {
        type: Number,
        required: true,
      },
    },
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
        const res = await getReportedList(this.curStatus);
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
    methods: {
      async onConfirm(id, index) {
        try {
          const res = await updateClientState(id, this.nextStatus);
          if (res && res.status === 200) {
            this.message = res.data.msg;
            this.color = 'success';
            this.snackbar = true;
            this.clientList.pop(index);
          } else {
            this.message = '操作失败';
            this.color = 'error';
          }
        } catch (error) {
          console.log(error);
        }
      },
      async onDelete(id, index) {
        try {
          const res = await updateClientState(id, 6);
          if (res && res.status === 200) {
            this.message = res.data.msg;
            this.color = 'success';
            this.snackbar = true;
            this.clientList.pop(index);
          } else {
            this.message = '操作失败';
            this.color = 'error';
          }
        } catch (error) {
          console.log(error);
        }
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
