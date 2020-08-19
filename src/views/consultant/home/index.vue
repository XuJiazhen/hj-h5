<template>
  <div class="home">
    <div class="banner">
      <v-avatar size="90">
        <img :src="avatar" alt="John" />
      </v-avatar>
      <span class="title">{{ name }}</span>
      <div class="features">
        <span class="identity">{{ identity }}</span>
        <span class="total">客户数：{{ clientList.length }} 人</span>
      </div>
    </div>
    <v-tabs centered grow color="#2a765a" icons-and-text optional height="55">
      <v-tab to="/consultant/reported" active-class="test">
        已报备
        <i class="icon iconfont icon-viewlist"></i>
      </v-tab>
      <v-tab to="/consultant/visited">
        已到访
        <i class="icon iconfont icon-remind"></i>
      </v-tab>
      <v-tab to="/consultant/traded">
        已成交
        <i class="icon iconfont icon-trust"></i>
      </v-tab>
    </v-tabs>
    <v-tabs centered grow color="#2a765a" icons-and-text optional height="55" style="border-top: 10px solid #ffffff;">
      <v-tab to="/consultant/signed" active-class="test">
        已签约
        <i class="icon iconfont icon-confirm"></i>
      </v-tab>
      <v-tab to="/consultant/owner">
        业主
        <i class="icon iconfont icon-Customermanagement"></i>
      </v-tab>
      <v-tab to="/consultant/closed">
        已结佣
        <i class="icon iconfont icon-integral"></i>
      </v-tab>
    </v-tabs>

    <div class="reported-title">
      <span>最新报备</span>
    </div>

    <div class="client-list">
      <div class="client-item" v-for="(item, index) in clientList.length && clientList" :key="index" @click="onClientItemClick(item.id, item.status)">
        <div class="client-title">
          <v-chip :color="color" label text-color="white" small>
            <v-icon left>mdi-label</v-icon>
            {{ item.status | statusFilter }}
          </v-chip>
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
    name: 'Home',
    data() {
      return {
        realInfo: null,
        total: 0,
        identity: '置业顾问',
        clientList: [],
        color: '#2a765a',
      };
    },
    computed: {
      avatar() {
        return this.realInfo.avatar;
      },
      name() {
        return this.realInfo.name;
      },
    },
    async created() {
      NProgress.inc(0.2);
      NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });
      NProgress.start();

      const realInfo = JSON.parse(localStorage.getItem('RealInfo'));

      if (realInfo) {
        this.realInfo = realInfo;
      }

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
        return v === 0 ? '未确认' : '已确认';
      },
    },
    methods: {
      onClientItemClick(id, status) {
        this.$router.push({ path: `/consultant/detail/${id}` });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    overflow: scroll;
    margin-bottom: 56px;

    .icon {
      font-size: 28px;
      font-feature-settings: 'liga';
      letter-spacing: normal;
      line-height: 1;
      position: relative;
      text-indent: 0;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
    }

    .banner {
      width: 100%;
      height: 18.75rem;
      background-color: var(--main-bg-color);
      background-image: url('../../../assets/images/banner.jpg');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .title {
        margin: 20px 0;
        font-size: 18px;
        font-weight: bold;
      }

      .features {
        font-size: 14px;
        color: #ffffff;

        span {
          border: 1px solid #ffffff;
          padding: 5px 10px;
          border-radius: 10px;
          margin: 0 5px;
        }
      }
    }

    .reported-title {
      width: 100%;
      text-align: center;
      background-color: var(--main-border-color);
      padding: 10px;
      color: var(--sub-text-color);
      font-size: 14px;
    }

    .client-list {
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
