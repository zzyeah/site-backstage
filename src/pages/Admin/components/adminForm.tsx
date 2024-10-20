import { AUTHORIZATION } from '@/constants/localStorage.constant';
import { AdminController } from '@/services';
import { AdminFormActionType, AdminInfo } from '@/types';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Radio, Upload } from 'antd';
import { Dispatch, SetStateAction } from 'react';
type SetAdminInfo<T = AdminFormActionType.add> =
  T extends AdminFormActionType.add
    ? (adminInfo: Partial<AdminInfo>) => any
    : Dispatch<SetStateAction<Partial<AdminInfo>>>;

export interface AdminFormProps<T = AdminFormActionType.add> {
  type: AdminFormActionType;
  adminInfo: Partial<AdminInfo>;
  setAdminInfo: SetAdminInfo<T>;
  submitHandle: () => any;
}

/**
 * Common Table Form
 * to add and modify Admin
 */
function AdminForm({
  adminInfo,
  setAdminInfo,
  submitHandle,
  type,
}: AdminFormProps) {
  const [formRef] = Form.useForm();
  if (formRef) {
    formRef.setFieldsValue(adminInfo);
  }

  const authorization = localStorage.getItem(AUTHORIZATION);
  let avatarPreview = null;
  if (type === AdminFormActionType.edit) {
    avatarPreview = (
      <Form.Item label="当前头像" name={'avatarPreview'}>
        <Image src={adminInfo?.avatar} width={100}></Image>
      </Form.Item>
    );
  }
  /**
   * 验证登录账号是否存在
   */
  async function checkLoginIdIsExist() {
    if (adminInfo.loginId && type === AdminFormActionType.add) {
      const { data } = await AdminController.adminIsExist(adminInfo.loginId);
      if (data) {
        // 该 loginId 已经注册过了
        throw '该管理员已经注册过了';
      }
    }
  }

  function updateInfo(newContent: any, key: keyof AdminInfo) {
    const newAdminInfo = { ...adminInfo };
    newAdminInfo[key] = newContent;
    setAdminInfo(newAdminInfo);
  }
  return (
    <Form
      name="basic"
      initialValues={adminInfo}
      autoComplete="off"
      form={formRef}
      onFinish={submitHandle}
    >
      <Form.Item
        label="管理员账号"
        name="loginId"
        rules={[
          { required: true, message: '请输入管理员账号' },
          // 验证用户是否已经存在
          { validateTrigger: 'onblur', validator: checkLoginIdIsExist },
        ]}
      >
        <Input
          value={adminInfo?.loginId}
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
          disabled={type === AdminFormActionType.edit ? true : false}
        />
      </Form.Item>

      {/* 密码 */}
      {/* 新增管理员 => 密码可以为空 */}
      {/* 修改管理员 => 密码不能为空 */}
      <Form.Item
        label="管理员密码"
        name="loginPwd"
        rules={[
          type === AdminFormActionType.edit
            ? { required: true, message: '密码不能为空' }
            : {},
        ]}
      >
        <Input.Password
          placeholder={
            type === AdminFormActionType.add ? '密码可选，默认是123123' : ''
          }
          value={adminInfo?.loginPwd}
          onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
        />
      </Form.Item>

      <Form.Item
        label="管理员昵称"
        name="name"
        rules={[
          type === AdminFormActionType.edit
            ? { required: true, message: '昵称不能为空' }
            : {},
        ]}
      >
        <Input
          placeholder={
            type === AdminFormActionType.add ? '昵称可选，默认是新增管理员' : ''
          }
          value={adminInfo?.name}
          onChange={(e) => updateInfo(e.target.value, 'name')}
        />
      </Form.Item>

      <Form.Item
        label="权限选择"
        name="permission"
        rules={[{ required: true, message: '请选择管理员权限' }]}
      >
        <Radio.Group
          onChange={(e) => updateInfo(e.target.value, 'permission')}
          value={adminInfo?.permission}
        >
          <Radio value={2}>普通管理员</Radio>
          <Radio value={1}>超级管理员</Radio>
        </Radio.Group>
      </Form.Item>
      {/* 当前头像 */}
      {/* 新增的时候不显示 */}
      {avatarPreview}

      <Form.Item label="上传头像" valuePropName="fileList">
        <Upload
          action="/api/upload"
          listType="picture-card"
          maxCount={1}
          headers={{ [AUTHORIZATION]: `Bearer ${authorization}` }}
          className="uploadStyle"
          onChange={(e) => {
            if (e.file.status === 'done') {
              // 说明上传已经完成
              const url = e.file.response.data;
              updateInfo(url, 'avatar');
            }
          }}
        >
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              头像可选
            </div>
          </div>
        </Upload>
      </Form.Item>
      {/* 按钮容器 */}
      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === AdminFormActionType.add ? '确认新增' : '修改'}
        </Button>

        <Button type="link" htmlType="submit" className="resetBtn">
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AdminForm;
