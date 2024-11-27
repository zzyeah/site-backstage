import { BlogFormActionType } from '@/types';
import { PageContainer } from '@ant-design/pro-components';
import { BlogForm } from './components';
import { useParams } from '@umijs/max';
import { useEffect, useState } from 'react';
import { BlogController } from '@/services';
import { AddBlogCompBlogInfo } from './addBlog';

function EditBlog() {
    // 获取传递过来的 id
    const {id}  = useParams();
    const [blogInfo, setBlogInfo] = useState<AddBlogCompBlogInfo>()

    useEffect(()=>{
        async function fetchData(id: string){
            // 根据问答 id 获取该问答具体的信息
            const { data } = await BlogController.getBlogById(id);
            setBlogInfo(data);
        }

        if(id) {
            fetchData(id)
        }
    },[])
    
    function submitHandle(content: any) {
      console.log('submitHandle');
      
    }

  return (
    <PageContainer>
      <div className="container" style={{ width: 800 }}>
        <BlogForm
          type={BlogFormActionType.edit}
          blogInfo={blogInfo!}
          setBlogInfo={setBlogInfo}
          submitHandle={submitHandle}
        />
      </div>
    </PageContainer>
  );
}

export default EditBlog;
