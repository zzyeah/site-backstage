import AdminController from '@/services/AdminController';
import { AdminInfo } from '@/types/Admin/adminInfo.interface';
import { Effect, Reducer } from '@umijs/max';

export const namespace = 'admin';

export interface AdminModelState {
  adminList: AdminInfo[];
  adminInfo?: AdminInfo;
}

export interface AdminModelType {
  namespace: typeof namespace;
  state: AdminModelState;
  effects: {
    _initAdminList: Effect;
  };
  reducers: {
    initAdminList: Reducer<AdminModelState>;
  };
}

const AdminModel: AdminModelType = {
  namespace,
  // 仓库数据
  state: {
    adminList: [], // 存储所有管理员信息
    adminInfo: undefined, // 存储当前登录的管理员信息
  },
  // 同步更新仓库状态数据
  reducers: {
    initAdminList(state, { payload }) {
      console.log(payload);
      const newState = { ...state };
      newState.adminList = payload;
      return newState;
    },
  },
  // 处理异步副作用
  effects: {
    *_initAdminList(_, { put, call }): Generator {
      // 和服务器进行通信,拿到所有数据
      const result = yield call(AdminController.getAdmin);
      console.log(result);
      const { data } = result;
      // 调用reducer 更新本地仓库
      yield put({
        type: 'initAdminList',
        payload: data,
      });
    },
  },
};
export default AdminModel;
