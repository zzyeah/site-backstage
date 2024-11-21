import { apiCall } from './api';

/**
 * 获取类型列表
 */
function getType() {
  return apiCall('/api/blogtype', {
    method: 'GET',
  });
}
/**
 * 获取类型列表
 */
function getTypeById(typeId: string) {
  return apiCall(`/api/blogtype/${typeId}`, {
    method: 'GET',
  });
}

/**
 * 新增类型
 */
function addType(newTypeInfo: { name: string; order: number }) {
  return apiCall('/api/blogtype', {
    method: 'POST',
    data: newTypeInfo,
  });
}

/**
 * 根据 id 删除类型
 */
function deleteType(typeId: string) {
  return apiCall(`/api/blogtype/${typeId}`, {
    method: 'DELETE',
  });
}

/**
 * 根据 id 修改类型
 */
function editType(
  typeId: string,
  newTypeInfo: { name: string; order: number },
) {
  return apiCall(`/api/blogtype/${typeId}`, {
    method: 'PUT',
    data: newTypeInfo,
  });
}

export default {
  getType,
  getTypeById,
  addType,
  deleteType,
  editType,
};
