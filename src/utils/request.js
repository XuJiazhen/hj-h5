import axios from 'axios';
import store from '../store';
import { getToken } from './auth.js';

const service = axios.create({
  baseURL: 'https://api.huijianfc.cn/hunan/wxweb/',
  timeout: 3000,
  withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    if (store.state.token && store.state.wechatInfo) {
      config.headers['X-User-Token'] = getToken('UserToken');
      config.headers['X-User-Id'] = store.state.wechatInfo.id;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;
