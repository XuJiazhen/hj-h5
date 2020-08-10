import Cookies from 'js-cookie';

const TokenKey = 'UserToken';

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function getToken(TokenKey) {
  return Cookies.get(TokenKey);
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey);
}
