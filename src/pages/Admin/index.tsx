import { AdminInfo } from '@/types/Admin/adminInfo.interface';
import {
  PageContainer,
  ProColumnType,
  ProTable,
} from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Tag } from 'antd';
import { useEffect } from 'react';

function Admin() {
  const dispatch = useDispatch();

  // 从仓库获取管理员数据
  const { adminList } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch({
      type: 'admin/_initAdminList',
    });
  }, []);

  // 对应表格每一列
  const columns: ProColumnType[] = [
    {
      title: '登录账号',
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: '登录密码',
      dataIndex: 'loginPwd',
      key: 'loginPwd',
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      valueType: 'avatar',
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      align: 'center',
      render: (_, row: AdminInfo) => {
        let tag =
          row.permission === 1 ? <Tag>超级管理员</Tag> : <Tag>普通管理员</Tag>;
        return [tag];
      },
    },
  ];

  return (
    <div>
      <PageContainer>
        <ProTable
          headerTitle="管理员列表"
          dataSource={adminList}
          rowKey={(row) => row.id}
          columns={columns}
        />
      </PageContainer>
    </div>
  );
}

export default Admin;
