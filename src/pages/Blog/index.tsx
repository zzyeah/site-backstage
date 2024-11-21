import { blogTypeModelNamespace, BlogTypeState } from '@/models/blogTypeModel';
import { BlogController } from '@/services';
import { GetBlogByParams } from '@/types';
import { formatDate } from '@/utils/tools';
import typeOptionCreator from '@/utils/typeOptions';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm, Select, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'umi';

// 请求方法
function Blog() {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { typeList } = useSelector<any, BlogTypeState>(
    (state) => state.blogType,
  );

  const dispatch = useDispatch(); // 获取 dispatch
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate();

  // 按类型进行搜索
  const [searchType, setSearchType] = useState({
    typeId: null,
  });

  // 如果类型列表为空，则初始化一次
  useEffect(() => {
    if (!typeList.length) {
      dispatch({
        type: `${blogTypeModelNamespace}/_initBlogTypeList`,
      });
    }
  }, []);

  function handleChange(value) {
    setSearchType({
      typeId: value,
    });
  }

  /**
   *
   * @param {*} page 当前页
   * @param {*} pageSize 每页条数
   */
  function handlePageChange(current, pageSize: any) {
    setPagination({
      current,
      pageSize,
    });
  }

  function deleteHandle(blogInfo) {
    BlogController.deleteBlog(blogInfo.id);
    actionRef.current!.reload(); // 再次刷新请求
    message.success('删除博客成功');
  }

  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 50,
      search: false,
      render: (text, record, index) => {
        return [(pagination.current - 1) * pagination.pageSize + index + 1];
      },
    },
    {
      title: '博客名称',
      dataIndex: 'title',
      width: 150,
      key: 'title',
    },
    {
      title: '博客分类',
      dataIndex: 'categoryId',
      key: 'categoryId',
      align: 'center',
      renderFormItem: (
        item,
        { type, defaultRender, formItemProps, fieldProps, ...rest },
        form,
      ) => {
        return (
          <Select placeholder="请选择查询分类" onChange={handleChange}>
            {typeOptionCreator({ Select, typeList })}
          </Select>
        );
      },
      render: (_, row) => {
        // 寻找对应类型的类型名称
        const type = typeList.find((item) => item.id === row.categoryId);
        return [
          <Tag color="purple" key={row.categoryId}>
            {type?.name}
          </Tag>,
        ];
      },
    },
    {
      title: '博客简介',
      dataIndex: 'description',
      key: 'age',
      align: 'center',
      width: 200,
      search: false,
      render: (_, row) => {
        // 将博客简介的文字进行简化
        // 在表格中显示博客简介时，过滤掉 html 标签
        let reg = /<[^<>]+>/g;
        let brief = row.description;
        brief = brief.replace(reg, '');

        if (brief.length > 15) {
          brief = brief.slice(0, 15) + '...';
        }
        return [brief];
      },
    },
    {
      title: '博客封面',
      dataIndex: 'thumb',
      key: 'thumb',
      valueType: 'image',
      align: 'center',
      search: false,
    },
    {
      title: '浏览数',
      dataIndex: 'scanNumber',
      key: 'scanNumber',
      align: 'center',
      search: false,
    },
    {
      title: '评论数',
      dataIndex: 'commentNumber',
      key: 'commentNumber',
      align: 'center',
      search: false,
    },
    {
      title: '上架日期',
      dataIndex: 'createDate',
      key: 'createDate',
      align: 'center',
      search: false,
      render: (_, row) => {
        return [formatDate(row.createDate)];
      },
    },
    {
      title: '操作',
      width: 150,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, row, index, action) => {
        return [
          <div key={row.id}>
            <Button
              type="link"
              size="small"
              onClick={() => navigate(`/blog/editBlog/${row.id}`)}
            >
              编辑
            </Button>
            <Popconfirm
              title="是否要删除该博客以及该博客对应的评论？"
              onConfirm={() => deleteHandle(row)}
              okText="删除"
              cancelText="取消"
            >
              <Button type="link" size="small">
                删除
              </Button>
            </Popconfirm>
          </div>,
        ];
      },
    },
  ];

  return (
    <>
      {/* 博客列表 */}
      <PageContainer>
        <ProTable
          headerTitle="博客列表"
          actionRef={actionRef}
          columns={columns}
          rowKey={(row) => row.id}
          params={searchType}
          onReset={() => {
            setSearchType({
              typeId: null,
            });
          }}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50, 100],
            ...pagination,
            onChange: handlePageChange,
          }}
          request={async (params) => {
            const { keyword, pageSize, current } = params;
            const request: GetBlogByParams = {
              keyword,
              limit: String(pageSize),
              page: String(current),
            };
            const result = await BlogController.getBlogByPage(request);
            console.log(result);

            return {
              data: result.data.rows,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: !result.code,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: result.data.total,
            };
          }}
        />
      </PageContainer>
    </>
  );
}

export default Blog;
