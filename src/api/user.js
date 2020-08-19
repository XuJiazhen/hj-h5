import request from '@/utils/request';

export function getUserInfo(code) {
  return request({
    url: `/login${code}`,
    method: 'get',
  });
}

export function getAuthInfo() {
  return request({
    url: '/auth',
    method: 'get',
  });
}

export function getClientList() {
  return request({
    url: '/report/list',
    method: 'get',
  });
}

export function getReportedList(status) {
  return request({
    url: '/report/list',
    method: 'get',
    params: { status },
  });
}

export function getClientDetail(id) {
  return request({
    url: '/report/info',
    method: 'get',
    params: { id },
  });
}

export function updateClientState(id, status) {
  return request({
    url: '/report/check',
    method: 'put',
    data: {
      id,
      status,
    },
  });
}
