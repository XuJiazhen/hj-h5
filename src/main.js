import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// STYLES
import 'normalize.css/normalize.css';
import '@/assets/styles/index.scss';
import '@/assets/styles/iconfont.css';

// UTILS
import '@/assets/js/iconfont.js';

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const whiteList = ['/validate', '/owner', '/validate'];

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;

  // ONLINE TEST CODE.

  if (store.state.refresh) {
    try {
      const userInfo = await store.dispatch('getUserInfo', window.location.search);
      console.log('USERINFO: ', userInfo);
      if (userInfo && !store.state.registered) {
        console.log('未验证的用户，前往注册页面');
        next('/validate');
      } else {
        if (store.state.identity === 'owner') {
          console.log('IDENTITY: OWNER');
          store.state.identity = '';
          next('/owner');
        } else if (store.state.identity === 'consultant') {
          console.log('IDENTITY: CONSULTANT');
          store.state.identity = '';
          next('/consultant');
        }
      }
    } catch (error) {
      console.log(error);
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    }
  }

  next();
  // LOCAL TEST CODE.

  // if (store.state.identity === 'owner') {
  //   store.state.identity = '';
  //   next('/owner');
  // } else if (store.state.identity === 'consultant') {
  //   store.state.identity = '';
  //   next('/consultant');
  // }
  // console.log(router.currentRoute.path);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
