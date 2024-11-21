import { request } from '@umijs/max';
import { responseInterceptor } from './interceptor/response.interceptor';
import { requestInterceptor } from './interceptor/reuqest.interceptor';

async function apiCall(url: string, opts: any = {}) {
  const defaultOpts = {
    method: 'GET',
    requestInterceptors: [requestInterceptor],
    responseInterceptors: [responseInterceptor],
  };
  const options = { ...defaultOpts, ...opts };
  try {
    return await request(url, options);
  } catch (error) {
    console.log('request has err', error);
    return error;
  }
}

export { apiCall };
