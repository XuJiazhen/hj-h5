import request from '@/utils/request';

export function submitForm(data) {
  return request({
    url: '/report/create',
    method: 'post',
    data,
  });
}
