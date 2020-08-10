<template>
  <div class="home">
    <div class="banner">
      <v-avatar size="90">
        <img :src="avatar" alt="John" />
      </v-avatar>
      <span class="title">{{ name }}</span>
      <div class="features">
        <span class="identity">{{ isRegistered }}</span>
        <span class="total">已推荐客户数：{{ total }} 人</span>
      </div>
    </div>
    <div class="tools">
      <div class="tools-item" v-for="(tool, index) in tools" :key="index">
        <i class="icon iconfont" :class="tool.icon"></i>
        <span class="text">{{ tool.name }}</span>
      </div>
    </div>
    <div class="report-body"></div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        userInfo: null,
        name: '胥佳桢',
        avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/5rQ5OyUwWK51Ivx6tHVvVbRGd3V19IhA5O12SedXCIwdBUMF4QJQAkXzCaIktn0bcSjjIOdSEpRs288rYzByHA/132',
        isRegistered: '已登记',
        title: '成都慧建房地产营销策划有限公司',
        total: 0,
        tools: [
          {
            icon: 'icon-qunzu',
            name: '客户',
          },
          {
            icon: 'icon-tongzhizhongxin',
            name: '成交',
          },
          {
            icon: 'icon-duanxin',
            name: '消息',
          },
        ],
      };
    },
    // computed: {
    //   avatar() {
    //     return this.userInfo.wechat_info.avatar;
    //   },
    //   isRegistered() {
    //     return this.userInfo.is_registed ? '已登记' : '未登记';
    //   },
    //   name() {
    //     return this.userInfo.wechat_info.name;
    //   },
    // },
    created() {
      const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
      if (userInfo) {
        this.userInfo = userInfo;
      }
    },
  };
</script>

<style lang="scss" scoped>
  .home {
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

    .tools {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #ffffff;
      padding: 10px 0;
      line-height: normal;

      .tools-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .icon {
          font-size: 28px;
        }

        .text {
          font-size: 14px;
          color: #808080;
          margin-top: 1px;
        }
      }
    }
  }
</style>
