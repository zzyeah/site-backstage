// 请求方法
import BlogTypeController from '@/services/BlogTypeController';

export default {
  namespace: 'blogType',
  state: {
    typeList: [],
  },
  reducers: {
    initBlogTypeList: (state, { payload }) => {
      const newObj = { ...state };
      newObj.typeList = payload;
      return newObj;
    },
    addBlogType: (state, { payload }) => {
      const newObj = { ...state };
      const arr = [...state.typeList];
      arr.push(payload);
      newObj.typeList = arr;
      return newObj;
    },
    deleteBlogType: (state, { payload }) => {
      const newObj = { ...state };
      const index = newObj.typeList.indexOf(payload);
      const arr = [...state.typeList];
      arr.splice(index, 1);
      newObj.typeList = arr;
      return newObj;
    },
  },
  effects: {
    // 初始化管理员列表
    *_initBlogTypeList(_, { put, call }) {
      // 从服务器获取数据
      const { data } = yield call(BlogTypeController.getType);
      // 调用 reducer 方法更新本地仓库
      yield put({ type: 'initBlogTypeList', payload: data });
    },
    // 新增类型
    *_addBlogType({ payload }, { put, call }) {
      // 和服务器通信，进行新增
      const { data } = yield call(BlogTypeController.addType, payload);
      // 调用 reducer 方法更新本地仓库
      yield put({ type: 'addBlogType', payload: data });
    },
    // 删除类型
    *_deleteBlogType({ payload }, { put, call }) {
      // 和服务器通信，进行删除
      yield call(BlogTypeController.deleteType, payload._id);
      // 本地仓库也需要同步更新
      yield put({ type: 'deleteBlogType', payload });
    },
  },
};
