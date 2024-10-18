import AdminController from '@/services/AdminController';
import { AdminInfo } from '@/types/Admin/adminInfo.interface';
import { AnyAction, Effect, Reducer } from '@umijs/max';
import { Model } from 'dva';

export const namespace = 'admin';

export interface AdminModelState {
  adminList: AdminInfo[];
}

export interface DeleteAdminAction extends AnyAction {
  type: string;
  payload: AdminInfo;
}

export interface AdminModelType extends Model {
  state: AdminModelState;
  effects: {
    _initAdminList: Effect;
    _deleteAdmin: Effect;
  };
  reducers: {
    initAdminList: Reducer<AdminModelState>;
    deleteAdminList: Reducer<AdminModelState>;
  };
}

const AdminModel: AdminModelType = {
  namespace,
  // 仓库数据
  state: {
    adminList: [], // 存储所有管理员信息
  },
  // 同步更新仓库状态数据
  reducers: {
    initAdminList(state, { payload }) {
      console.log(payload);
      const newState = { ...state };
      newState.adminList = payload;
      return newState;
    },
    deleteAdminList(state, { payload }) {
      const newState = { ...state };
      const index = newState.adminList.indexOf(payload);
      const arr = {...newState.adminList};
      arr.splice(index, 1);
      newState.adminList = arr;
      return newState;
    },
  },
  // 处理异步副作用
  effects: {
    // 初始化管理员列表
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
    // 删除一个管理员
    *_deleteAdmin({ payload }, { put, call }): Generator {
      // 和服务器进行通信, 删除服务器数据
      yield call(AdminController.deleteAdmin, payload.id);
      // 更新本地仓库
      yield put({ type: 'deleteAdminList', payload });
    },
  },
};
export default AdminModel;
