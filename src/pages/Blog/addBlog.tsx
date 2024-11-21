import { BlogController } from '@/services';
import { BlogFormActionType, BlogInfo } from '@/types';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useState } from 'react';
import { BlogForm } from './components';

export type AddBlogCompBlogInfo = Omit<
  BlogInfo,
  'scanNumber' | 'commentNumber'
>;
function AddBlog() {
  const [newBlogInfo, setNewBlogInfo] = useState<AddBlogCompBlogInfo>({
    title: '',
    description: '',
    htmlContent: '',
    thumb: '',
    createDate: 0,
    categoryId: 0,
    markdownContent: '',
  });
  const navigator = useNavigate();

  // 确认新增博客
  function submitHandle({
    htmlContent,
    markdownContent,
  }: Pick<BlogInfo, 'htmlContent' | 'markdownContent'>) {
    // 调用控制器方法进行新增
    const { title, description, thumb, categoryId } = newBlogInfo;
    BlogController.addBlog({
      title,
      description,
      htmlContent,
      categoryId,
      thumb,
      markdownContent,
      createDate: new Date().getTime(),
    });
    message.success('添加书籍成功');
    // 跳回书籍列表页面
    navigator('/blog/blogList');
  }

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
