import axios from 'axios';
// import store from '../store';

const service = axios.create({
  baseURL: 'https://api.huijianfc.cn/hunan/wxweb/',
  timeout: 3000,
  withCredentials: true,
});

// service.interceptors.request.use(
//   (config) => {
//     if (store.state.token) {
//       config.headers['X-Admin-Token'] = getToken();
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default service;
