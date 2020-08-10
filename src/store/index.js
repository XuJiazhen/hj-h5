import Vue from 'vue';
import Vuex from 'vuex';

import { getUserInfo, getAuthInfo } from '@/api/user.js';
import { setToken } from '@/utils/auth.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    refresh: true,
    userInfo: null,
    registered: false,
    identity: 'owner',
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
      state.registered = userInfo.is_registed;
      state.refresh = false;
    },
    SET_REALINFO: (state, realInfo) => {
      state.userInfo = realInfo.info;
      state.registered = realInfo.info.is_registed;
    },
  },
  actions: {
    getUserInfo({ commit }, code) {
      return new Promise((resolve, reject) => {
        getUserInfo(code)
          .then((res) => {
            console.log(res);
            if (res && res.status === 203) {
              window.location.assign(
                'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6adda564dfb9dd52&redirect_uri=https://nfhy.wechat.huijianfc.com&response_type=code&scope=snsapi_userinfo&#wechat_redirect',
              );
            } else {
              const { data } = res;
              commit('SET_USERINFO', data);
              localStorage.setItem('UserInfo', JSON.stringify(data));
              setToken(data.wechat_info.token);
              resolve(data);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    userRegistered({ commit }, data) {
      commit('SET_REALINFO', data);
      return true;
    },
  },
  modules: {},
});
