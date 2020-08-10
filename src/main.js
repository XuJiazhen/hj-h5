import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { getToken } from '@/utils/auth.js';
import { getUserInfo, getAuthInfo } from '@/api/user.js';

// STYLES
import 'normalize.css/normalize.css';
import '@/assets/styles/index.scss';
import '@/assets/styles/iconfont.css';

// UTILS
import '@/assets/js/iconfont.js';

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;

  // ONLINE TEST CODE.

  // if (store.state.refresh) {
  //   try {
  //     const userInfo = await store.dispatch('getUserInfo', window.location.search);
  //     console.log('USERINFO: ', userInfo);
  //     if (userInfo && store.state.identity === 'owner') {
  //       store.state.identity = '';
  //       next('/owner');
  //     } else {
  //       next();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     next();
  //   }
  // } else {
  //   if (to.path === '/owner') {
  //     store.state.identity = '';
  //     next();
  //   } else {
  //     next();
  //   }
  // }

  // LOCAL TEST CODE.

  if (store.state.identity === 'owner') {
    store.state.identity = '';
    next('/owner');
  } else if (store.state.identity === 'consultant') {
    store.state.identity = '';
    next('/consultant');
  }

  next();
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
