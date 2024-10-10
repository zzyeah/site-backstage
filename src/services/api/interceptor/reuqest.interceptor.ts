import { AUTHORIZATION } from '@/constants/localStorage.constant';
import { RequestInterceptor, RequestOptions } from '@umijs/max';

export const requestInterceptor: RequestInterceptor = (
  config: RequestOptions,
) => {
  const authorization = localStorage.getItem(AUTHORIZATION);
  if (authorization && config.headers)
    config.headers[AUTHORIZATION] = `Bearer ${authorization}`;
  return config;
};
