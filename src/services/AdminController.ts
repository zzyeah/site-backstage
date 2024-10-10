import { AdminInfo } from '@/types/Admin/adminInfo.interface';
import { LoginRequest } from '@/types/Api/Admin/login.request';
import { LoginResponse } from '@/types/Api/Admin/login.response';
import { DefaultResponse } from '@/types/Api/response.interface';
import { apiCall } from './api';
import { LoginResponseInterceptors } from './api/interceptor/Login/loginResponse.interceptor';

/**
 * 获取所有的管理员
 */
function getAdmin(params: any): Promise<AdminInfo> {
  return apiCall('/api/admin', {
    params,
  });
}

function login(data: LoginRequest): Promise<DefaultResponse<LoginResponse>> {
  return apiCall('/api/admin/login', {
    method: 'POST',
    data,
    responseInterceptors: [LoginResponseInterceptors],
  });
}

function captcha() {
  return apiCall('/res/captcha');
}

export default {
  getAdmin,
  captcha,
  login,
};
