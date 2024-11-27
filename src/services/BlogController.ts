import { BlogInfo, GetBlogByParams } from '@/types';
import { apiCall } from './api';

/**
 * 分页获取博客
 */
function getBlogByPage(params: GetBlogByParams) {
  return apiCall('/api/blog', {
    params,
  });
}

/**
 * 根据 id 获取博客详情
 */
function getBlogById(blogId: string) {
  return apiCall(`/api/blog/${blogId}`);
}

/**
 * 新增博客
 */
function addBlog(newBlogInfo: Omit<BlogInfo, 'scanNumber'| 'commentNumber'>) {
  return apiCall('/api/blog', {
    method: 'POST',
    data: newBlogInfo,
  });
}

/**
 * 根据 id 删除博客
 */

function deleteBlog(blogId: string) {
  return apiCall(`/api/blog/${blogId}`, {
    method: 'DELETE',
  });
}

/**
 * 根据 id 编辑博客
 */
function editBlog(blogId: string, newBlogInfo: Partial<BlogInfo>) {
  return apiCall(`/api/blog/${blogId}`, {
    method: 'PUT',
    data: newBlogInfo,
  });
}

export default {
  getBlogByPage,
  getBlogById,
  addBlog,
  deleteBlog,
  editBlog,
};
