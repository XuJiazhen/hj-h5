import request from '@/utils/request';

export function submitForm(data) {
  return request({
    url: '/register',
    method: 'post',
    data,
  });
}
