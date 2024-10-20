import { request } from '@umijs/max';
import { requestInterceptor } from './interceptor/reuqest.interceptor';
import { responseInterceptor } from './interceptor/response.interceptor';


function apiCall(url: string, opts: any = {}) {
  const defaultOpts = {
    method: 'GET',
    requestInterceptors: [requestInterceptor],
    responseInterceptors: [responseInterceptor]
  };
  const options = { ...defaultOpts, ...opts };
  return request(url, options);
}

export { apiCall };
