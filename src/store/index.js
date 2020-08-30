import Vue from 'vue';
import Vuex from 'vuex';

import { getUserInfo } from '@/api/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    refresh: true,
    wechatInfo: null,
    realInfo: null,
    registered: false,
    identity: 'owner',
  },
  mutations: {
    SET_USERINFO: (state, data, res) => {
      state.wechatInfo = data.wechat_info;
      state.realInfo = data.local_info;
      state.registered = data.is_registed;
      state.identity = data.user_type;
      state.refresh = false;
    },
    SET_REALINFO: (state, data) => {
      state.wechatInfo = data.info.wechat_info;
      state.realInfo = data.info.local_info;
      state.identity = data.info.identity;
      state.registered = data.info.is_registed;
    },
  },
  actions: {
    getUserInfo({ commit }, code) {
      return new Promise((resolve, reject) => {
        getUserInfo(code)
          .then((res) => {
            console.log('LOGININFO: ', res);
            if (res && res.status === 203) {
              window.location.assign(
                'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6adda564dfb9dd52&redirect_uri=https://nfhy.wechat.huijianfc.com&response_type=code&scope=snsapi_userinfo&#wechat_redirect',
              );
            } else {
              const { data } = res;
              commit('SET_USERINFO', data);
              localStorage.setItem('WechatInfo', JSON.stringify(data.wechat_info));
              localStorage.setItem('RealInfo', JSON.stringify(data.local_info));
              resolve(data);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    userRegistered({ commit }, data) {
      if (data) {
        localStorage.setItem('WechatInfo', JSON.stringify(data.info.wechat_info));
        localStorage.setItem('RealInfo', JSON.stringify(data.info.local_info));
        commit('SET_REALINFO', data);
        return true;
      }
    },
  },
  modules: {},
});
