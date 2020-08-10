<template>
  <div class="tabbar">
    <div class="tabbar-item left" @click="onTabbarItemClick('/')">
      <i class="icon iconfont icon-shouye"></i>
      <span class="text">首页</span>
    </div>

    <div class="tabbar-item" @click="onTabbarItemClick('/report')">
      <div class="center">
        <i class="icon iconfont icon-daohang"></i>
        <span class="text">推荐</span>
      </div>
    </div>

    <div class="tabbar-item right" @click="onTabbarItemClick('/user')">
      <i class="icon iconfont icon-anniu_gerenzhongxin"></i>
      <span class="text">我的</span>
    </div>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ dialogMsg }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="onCancel">取消</v-btn>
          <v-btn text @click="onConfirm">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
    data() {
      return {
        userInfo: null,
        dialog: false,
        dialogMsg: '您还未登记，是否前往？',
      };
    },
    methods: {
      onTabbarItemClick(path) {
        if (this.$route.path === '/validate' && !this.$store.state.registered) {
          this.dialogMsg = '请先登记';
          this.dialog = true;
          return;
        }
        if (!this.$store.state.registered) {
          this.dialog = true;
          return;
        } else if (this.$route.path !== path) {
          this.$router.push(path);
        }
      },
      onCancel() {
        this.dialog = false;
      },
      onConfirm() {
        if (this.$route.path !== '/validate') {
          this.$router.push('/validate');
          this.dialog = false;
        } else {
          this.dialog = false;
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .router-link-exact-active {
    i.icon,
    span.text {
      color: var(--main-bg-color) !important;
    }

    .center {
      border-color: var(--main-bg-color) !important;
    }
  }

  .tabbar {
    width: 100%;
    height: 55px;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .tabbar-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: normal;
      transition: all 0.3s;

      .icon {
        display: block;
        font-size: 28px;
        transition: all 0.3s;
      }

      .text {
        color: var(--black);
        transition: all 0.1s;
      }

      .center {
        box-sizing: border-box;
        background-color: var(--white);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-bottom: 35px;
        // border: 1px solid var(--main-bg-color);
        border: 1px solid var(--black);
      }
    }
  }
</style>
