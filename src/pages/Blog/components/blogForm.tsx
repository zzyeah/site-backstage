import '@toast-ui/editor/dist/toastui-editor.css';

import { blogTypeModelNamespace, BlogTypeState } from '@/models/blogTypeModel';
import { BlogFormActionType, BlogInfo } from '@/types';
import typeOptionCreator from '@/utils/typeOptions';
import { PlusOutlined } from '@ant-design/icons';
import { Editor } from '@toast-ui/react-editor';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Form, Image, Input, Select, Upload } from 'antd';
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AddBlogCompBlogInfo } from '../addBlog';

type BlogInfoProps<T extends BlogFormActionType = BlogFormActionType.add> =
  T extends BlogFormActionType.add ? AddBlogCompBlogInfo : any;

type SetBlogInfo<T extends BlogFormActionType = BlogFormActionType.add> =
  T extends BlogFormActionType.add
    ? (adminInfo: BlogInfoProps<T>) => any
    : Dispatch<SetStateAction<BlogInfoProps<T>>>;

export interface BlogFormProps<
  T extends BlogFormActionType = BlogFormActionType.add,
> {
  type: BlogFormActionType;
  blogInfo: AddBlogCompBlogInfo;
  setBlogInfo: SetBlogInfo<T>;
  submitHandle: (
    data: Pick<BlogInfo, 'htmlContent' | 'markdownContent'>,
  ) => any;
}

function BlogForm({
  type,
  blogInfo,
  setBlogInfo,
  submitHandle,
}: BlogFormProps) {
  const [formRef] = Form.useForm();
  if (formRef) {
    formRef.setFieldsValue(blogInfo);
  }
  const [firstIn, setFirstIn] = useState(true); // 记录是否是第一次进入
  const editorRef = useRef<Editor>(null); // 关联 markdown 编辑器
  const dispatch = useDispatch();

  // 从仓库获取所有的分类
  const { typeList } = useSelector<any, BlogTypeState>(
    (state) => state.blogType,
  );

  useEffect(() => {
    if (!typeList.length) {
      dispatch({
        type: `${blogTypeModelNamespace}/_initBlogTypeList`,
      });
    }
  }, []);
  function addHandle() {
    // 获取markdown editor 的值
    const htmlContent = editorRef.current?.getInstance().getHTML();
    const markdownContent = editorRef.current?.getInstance().getMarkdown();
    submitHandle({ htmlContent, markdownContent });
  }
  let blogPicPreview: ReactElement | null = null;
  if (type === BlogFormActionType.edit) {
    blogPicPreview = (
      <Form.Item label="当前封面" name="blogPicPreview">
        <Image src={blogInfo?.thumb} width={100} />
      </Form.Item>
    );
  }

  /**
   * 用户在填写表单信息的时候，实时的修改 blogInfo 状态
   * @param {*} newContent
   * @param {*} key
   */
  function updateInfo<T extends keyof BlogInfo = keyof BlogInfo>(
    newContent: BlogInfo[T],
    key: keyof BlogInfo,
  ) {
    const newBlogTypeInfo = { ...blogInfo };
    Reflect.set(newBlogTypeInfo, key, newContent);
    setBlogInfo(newBlogTypeInfo);
  }

  /**
   * 分类下拉列表改变时对应的回调
   */
  function handleTypeChange(value: number) {
    updateInfo(value, 'categoryId');
  }

  // 这里需要注意的就是关于有 markdown 编辑器时数据的回填
  useEffect(() => {
    if (formRef && firstIn && blogInfo && editorRef) {
      formRef.setFieldsValue(blogInfo);
      // 关键就是关于编辑器的回填
      editorRef.current!.getInstance().setHTML(blogInfo?.htmlContent);
      // 将 firstIn 设置为 false
      setFirstIn(false);
    }
    if (formRef) {
      formRef.setFieldsValue(blogInfo);
    }
  }, [blogInfo]);

  return (
    <Form
      name="basic"
      initialValues={blogInfo}
      autoComplete="off"
      form={formRef}
      onFinish={addHandle}
    >
      {/* 博客标题 */}
      <Form.Item
        label="博客标题"
        name="blogTitle"
        rules={[{ required: true, message: '请输入书名' }]}
      >
        <Input
          value={blogInfo?.title}
          onChange={(e) => updateInfo(e.target.value, 'title')}
        />
      </Form.Item>
      {/* 博客描述 */}
      <Form.Item
        label="博客描述"
        name="description"
        rules={[{ required: true, message: '请输入博客描述' }]}
      >
        <Input
          value={blogInfo?.description}
          onChange={(e) => updateInfo(e.target.value, 'description')}
        />
      </Form.Item>
      {/* 博客内容，需要使用到 markdown editor */}
      <Form.Item
        label="博客内容"
        name="blogIntro"
        rules={[{ required: true, message: '请输入博客内容' }]}
      >
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          language="zh-CN"
          ref={editorRef}
        />
      </Form.Item>

      <Form.Item
        label="博客分类"
        name="typeId"
        rules={[{ required: true, message: '请选择博客分类' }]}
      >
        <Select style={{ width: 200 }} onChange={handleTypeChange}>
          {typeOptionCreator({ Select, typeList })}
        </Select>
      </Form.Item>

      {/* 博客图片的预览，这个是在修改博客的时候会显示之前博客的图片 */}
      {blogPicPreview}

      <Form.Item label="博客封面" valuePropName="fileList">
        <Upload
          action="/api/upload"
          listType="picture-card"
          maxCount={1}
          onChange={(e) => {
            if (e.file.status === 'done') {
              // 说明上传已经完成
              const url = e.file.response.data;
              updateInfo(url, 'thumb');
            }
          }}
        >
          <PlusOutlined />
        </Upload>
      </Form.Item>

      {/* 确认修改按钮 */}
      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === BlogFormActionType.add ? '确认新增' : '修改'}
        </Button>

        <Button type="link" htmlType="submit" className="resetBtn">
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default BlogForm;
