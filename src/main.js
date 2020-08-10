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

  if (store.state.identity === 'owner') {
    store.state.identity = '';
    next('/owner');
  } else {
    next();
  }

  next();

  // if (store.state.refresh) {
  //   try {
  //     const userInfo = await store.dispatch('getUserInfo', window.location.search);
  //     console.log('USERINFO: ', userInfo);
  //     next();
  //   } catch (error) {
  //     console.log(error);
  //     next();
  //   }
  // } else {
  //   next();
  // }

  // const token = Object.keys(getToken()).length;

  // if (token) {
  //   console.log('HAS TOKEN: ', Boolean(token));
  //   next();
  // } else {
  //   try {
  //     const userInfo = await store.dispatch('getUserInfo', window.location.search);
  //     console.log('USERINFO: ', userInfo);
  //     next();
  //   } catch (error) {
  //     console.log(error);
  //     next();
  //   }
  // }

  // next();

  // const token = Object.keys(getToken()).length;

  // if (token) {
  //   console.log(`TOKEN: ${token}`);
  //   if (to.path === '/validate') {
  //     next();
  //   } else {
  //     if (store.state.registered) {
  //       console.log(`REGISTERED: ${store.state.registered}`);
  //       next();
  //     } else {
  //       console.log(`REGISTERED: ${store.state.registered}`);
  //       next({ path: '/validate' });
  //     }
  //   }
  // } else {
  //   const userInfo = await store.dispatch('getUserInfo', window.location.search);
  //   console.log('USERINFO: ', userInfo);

  //   next();
  //   if (userInfo.is_registed) {
  //     next();
  //   } else {
  //     const authInfo = await getAuthInfo();
  //     console.log('AUTHINFO: ', authInfo);
  //     next({ path: '/validate' });
  //   }
  // }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
