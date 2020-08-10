<template>
  <div class="user">
    <div class="feature-list">
      <div class="list-item">
        <img v-if="avatar" :src="avatar" />
        <div v-else class="avatar-text">
          <span>A</span>
        </div>
        <span class="title">{{ title }}</span>
        <i class="icon iconfont icon-jiantou_liebiaoxiangyou"></i>
      </div>
      <div class="list-item" v-for="(item, index) in featureList" :key="index">
        <span class="title">{{ item.title }}</span>
        <i class="icon iconfont icon-jiantou_liebiaoxiangyou"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'User',
    data() {
      return {
        title: '成都慧建房地产营销策划有限公司',
        avatar: '',
        featureList: [
          {
            title: '我的客户',
          },
          {
            title: '我的消息',
          },
          {
            title: '常见问题',
          },
          {
            title: '更改密码',
          },
          {
            title: '退出账号',
          },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
  .user {
    background-color: red;
    .feature-list {
      background-color: #ffffff;

      .list-item {
        padding: 0 10px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffff;
        border-bottom: 1px solid #f4f4f4;

        .title {
          flex: 1;
        }

        .icon {
          font-size: 28px;
        }

        .avatar-text {
          width: 55px;
          height: 55px;
          margin-right: 10px;
          background-color: var(--main-bg-color);
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
        }
      }

      .list-item:nth-child(3n + 1) {
        border-bottom: 10px solid #f4f4f4;
      }

      .list-item:first-child {
        padding-top: 35px;
        padding-bottom: 35px;
      }

      .list-item:last-child {
        border: none;
      }
    }
  }
</style>
