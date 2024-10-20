import { AdminModelState } from '@/models/adminModel';
import { AdminFormActionType, AdminInfo } from '@/types';
import { PageContainer } from '@ant-design/pro-components';
import { useDispatch, useNavigate, useSelector } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import AdminForm from './components/adminForm';

function AddAdmin() {
  const [newAdminInfo, setNewAdminInfo] = useState<Partial<AdminInfo>>({
    loginId: '',
    loginPwd: '',
    name: '',
    avatar: '',
    permission: 2, // 默认是普通管理员
  });

  const { adminList } = useSelector(
    (state: { admin: AdminModelState }) => state.admin,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function submitHandle() {
    // 点击表单确认功能
    dispatch({
      type: 'admin/_addAdmin',
      payload: newAdminInfo,
    });
    message.success('添加管理员成功');
    navigate('/admin/adminList');
  }

  useEffect(() => {
    if (!adminList.length) {
      dispatch({ type: 'admin/_initAdminList' });
    }
  }, [adminList]);

  return (
    <PageContainer>
      <div className="container" style={{ width: '500px' }}>
        <AdminForm
          type={AdminFormActionType.add}
          adminInfo={newAdminInfo}
          setAdminInfo={setNewAdminInfo}
          submitHandle={submitHandle}
        ></AdminForm>
      </div>
    </PageContainer>
  );
}

export default AddAdmin;
