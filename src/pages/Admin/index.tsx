// import { AUTHORIZATION } from '@/constants/localStorage.constant';
import { AdminModelState } from '@/models/adminModel';
import { AdminInfo } from '@/types/Admin/adminInfo.interface';
import {
  PageContainer,
  ProColumnType,
  ProTable,
} from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, message, Popconfirm, Switch, TablePaginationConfig, Tag } from 'antd';
import { useEffect } from 'react';

function Admin() {
  const dispatch = useDispatch();

  // 从仓库获取管理员数据
  const { adminList } = useSelector<any, AdminModelState>(
    (state) => state.admin,
  );
  // const isLogin = localStorage.getItem(AUTHORIZATION);

  useEffect(() => {
    if (!adminList.length) {
      dispatch({
        type: 'admin/_initAdminList',
      });
    }
  }, [adminList]);

  const deleteHandle = (row: AdminInfo) => {
    // 需要判断是否是当前登陆的用户
    dispatch({type: 'admin/_deleteAdmin', payload: row})
    message.success('删除管理员成功');
  };

  // 对应表格每一列
  const columns: ProColumnType<AdminInfo>[] = [
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
        // return [
        //   <Tag color="red" key={row._id}>
        //     -
        //   </Tag>,
        // ];
        const tag =
          row.permission === 1 ? (
            <Tag key={row.id}>超级管理员</Tag>
          ) : (
            <Tag key={row.id}>普通管理员</Tag>
          );
        return [tag];
      },
    },
    {
      title: '账号状态',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      render: (_, row: AdminInfo) => (
        <Switch
          key={row.id}
          size={'small'}
          defaultChecked={!!row.enabled}
          onChange={() => {}}
        />
      ),
    },
    {
      title: '操作',
      width: 150,
      key: 'option',
      align: 'center',
      render: (_, row: AdminInfo) => {
        return (
          <div key={row.id}>
            <Button type="link" size="small">
              编辑
            </Button>
            <Popconfirm
              title="是否确定删除此管理员"
              onConfirm={() => deleteHandle(row)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" size="small">
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const pagination: TablePaginationConfig = {
    pageSize: 5,
  };

  return (
    <div>
      <PageContainer>
        <ProTable
          headerTitle="管理员列表"
          dataSource={adminList}
          rowKey={(row) => row.id}
          columns={columns}
          search={false}
          pagination={pagination}
        />
      </PageContainer>
    </div>
  );
}

export default Admin;
