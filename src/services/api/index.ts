import { request, RequestOptions } from '@umijs/max';
import { requestInterceptor } from './interceptor/reuqest.interceptor';

function apiCall(url: string, opts: RequestOptions = {}) {
  const defaultOpts: RequestOptions = {
    method: 'GET',
    requestInterceptors: [requestInterceptor],
  };
  const options = { ...defaultOpts, ...opts };
  return request(url, options);
}

export { apiCall };
