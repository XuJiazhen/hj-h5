<template>
  <div class="owner">
    <router-view />
    <v-bottom-navigation fixed grow color="#2a765a">
      <v-btn to="/owner/home">
        <span>首页</span>
        <i class="icon iconfont icon-shouye"></i>
      </v-btn>

      <v-btn to="/owner/recommend">
        <span>推荐</span>
        <i class="icon iconfont icon-daohang"></i>
      </v-btn>

      <v-btn to="/owner/my">
        <span>我的</span>
        <i class="icon iconfont icon-anniu_gerenzhongxin"></i>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
  export default {
    name: 'Owner',
    data() {
      return {};
    },
  };
</script>

<style lang="scss" scoped>
  .owner {
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
