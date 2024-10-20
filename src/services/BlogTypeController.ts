import { request } from 'umi';

/**
 * 获取类型列表
 */
function getType() {
  return request('/api/blogtype', {
    method: 'GET',
  });
}
/**
 * 获取类型列表
 */
function getTypeById(typeId: string) {
  return request(`/api/blogtype/${typeId}`, {
    method: 'GET',
  });
}

/**
 * 新增类型
 */
function addType(newTypeInfo: { name: string; order: number }) {
  return request('/api/blogtype', {
    method: 'POST',
    data: newTypeInfo,
  });
}

/**
 * 根据 id 删除类型
 */
function deleteType(typeId: string) {
  return request(`/api/blogtype/${typeId}`, {
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
  return request(`/api/blogtype/${typeId}`, {
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
