import { AdminInfoOfProps } from '@/pages/Admin/addAdmin';
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

/**
 * 新增管理员
 */
function addAdmin(newAdminInfo: AdminInfoOfProps) {
  return apiCall('/api/admin', {
    method: 'POST',
    data: newAdminInfo,
  });
}

/**
 * 删除管理员信息
 */
function deleteAdmin(params: string) {
  return apiCall(`/api/admin/${params}`, {
    method: 'DELETE',
  });
}

/**
 * 修改管理员信息
 */
function editAdmin(adminId: string, newAdminInfo: Record<string, any>) {
  return apiCall(`/api/admin/${adminId}`, {
    method: 'PUT',
    data: newAdminInfo,
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

/**
 * 恢复登录状态
 */

function getInfo(): Promise<DefaultResponse<LoginResponse>> {
  return apiCall('/api/admin/whoami');
}

/**
 * 根据 id 获取管理员
 */
function getAdminById(adminId: string | number) {
  return apiCall(`/api/admin/${adminId}`);
}

/**
 * 根据 loginId 查找用户
 */
function adminIsExist(loginId: string) {
  return apiCall(`/api/admin/adminIsExist/${loginId}`);
}

export default {
  getAdmin,
  deleteAdmin,
  editAdmin,
  captcha,
  login,
  getInfo,
  getAdminById,
  adminIsExist,
  addAdmin,
};
