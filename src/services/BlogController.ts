import { BlogInfo, GetBlogByParams } from '@/types';
import { request } from 'umi';

/**
 * 分页获取书籍
 */
function getBlogByPage(params: GetBlogByParams) {
  return request('/api/blog', {
    params,
  });
}

/**
 * 根据 id 获取书籍详情
 */
function getBlogById(blogId: string) {
  return request(`/api/blog/${blogId}`);
}

/**
 * 新增书籍
 */
function addBlog(newBlogInfo: BlogInfo) {
  return request('/api/blog', {
    method: 'POST',
    data: newBlogInfo,
  });
}

/**
 * 根据 id 删除书籍
 */

function deleteBlog(blogId: string) {
  return request(`/api/blog/${blogId}`, {
    method: 'DELETE',
  });
}

/**
 * 根据 id 编辑书籍
 */
function editBlog(blogId: string, newBlogInfo: Partial<BlogInfo>) {
  return request(`/api/blog/${blogId}`, {
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
