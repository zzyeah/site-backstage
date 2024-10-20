import { BlogFormActionType, BlogInfo } from '@/types';
import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';
import { BlogForm } from './components';

function AddBlog() {
  const [newBlogInfo, setNewBlogInfo] = useState<Partial<BlogInfo>>({
    title: '',
    description: '',
    htmlContent: '',
    thumb: '',
    createDate: '',
    categoryId: 0,
  });

  // 确认新增博客
  function submitHandle() {}

  return (
    <PageContainer>
      <div className="container" style={{ width: '1000px' }}>
        <BlogForm
          type={BlogFormActionType.add}
          blogInfo={newBlogInfo}
          setBlogInfo={setNewBlogInfo}
          submitHandle={submitHandle}
        ></BlogForm>
      </div>
    </PageContainer>
  );
}

export default AddBlog;
