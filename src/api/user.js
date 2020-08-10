import request from '@/utils/request';

export function getUserInfo(code) {
  return request({
    url: `/login${code}`,
    method: 'get',
  });
}

export function getAuthInfo() {
  return request({
    url: `/auth`,
    method: 'get',
  });
}
