<template>
  <div class="consultant">
    <router-view />
    <v-bottom-navigation fixed grow color="#2a765a">
      <v-btn to="/consultant/home">
        <span>首页</span>
        <i class="icon iconfont icon-shouye"></i>
      </v-btn>

      <v-btn to="/consultant/my">
        <span>我的</span>
        <i class="icon iconfont icon-anniu_gerenzhongxin"></i>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
  export default {
    name: 'Consultant',
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .consultant {
    .icon {
      font-size: 28px;
      font-feature-settings: 'liga';
      letter-spacing: normal;
      line-height: 1;
      position: relative;
      text-indent: 0;
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
    }
  }
</style>

<style lang="scss">
  .consultant {
    .v-btn {
      max-width: none !important;
    }
  }
</style>
