<template>
  <div class="home">
    <div class="banner">
      <v-avatar size="90">
        <img :src="avatar" />
      </v-avatar>
      <span class="title">{{ name }}</span>
      <div class="features">
        <span class="identity">{{ isRegistered }}</span>
      </div>
    </div>
    <v-tabs centered grow color="#2a765a" icons-and-text optional height="55">
      <v-tab to="/owner/client" active-class="test">
        客户
        <i class="icon iconfont icon-qunzu"></i>
      </v-tab>
      <v-tab to="/owner/clinch">
        成交
        <i class="icon iconfont icon-tongzhizhongxin"></i>
      </v-tab>
      <v-tab to="/owner/message">
        消息
        <i class="icon iconfont icon-duanxin"></i>
      </v-tab>
    </v-tabs>

    <div class="msg-list"></div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        realInfo: null,
        total: 0,
      };
    },
    computed: {
      avatar() {
        return this.realInfo.avatar;
      },
      isRegistered() {
        return this.$store.state.registered ? '已登记' : '未登记';
      },
      name() {
        return this.realInfo.realname;
      },
    },
    created() {
      const realInfo = JSON.parse(localStorage.getItem('RealInfo'));
      if (realInfo) {
        this.realInfo = realInfo;
      }
    },
  };
</script>

<style lang="scss" scoped>
  .home {
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
      height: 24.75rem;
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
    .msg-list {
      border-top: 10px solid var(--main-border-color);
    }
  }
</style>
