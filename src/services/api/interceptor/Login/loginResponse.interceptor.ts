import { AUTHORIZATION } from '@/constants/localStorage.constant';
import { AxiosResponse, ResponseInterceptor } from '@umijs/max';

export const LoginResponseInterceptors: ResponseInterceptor = (
  response: AxiosResponse,
) => {
  const authorization = response.headers[AUTHORIZATION];
  if (authorization) localStorage.setItem(AUTHORIZATION, authorization);
  return response;
};
