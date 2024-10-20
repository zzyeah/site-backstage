import AdminController from '@/services/AdminController';
import { AdminInfo } from '@/types/Admin/adminInfo.interface';
import { Effect, Model } from 'dva';
import { AnyAction, Reducer } from 'redux';

export const namespace = 'admin';

export interface AdminModelState {
  adminList: AdminInfo[];
}

export interface DeleteAdminAction extends AnyAction {
  type: string;
  payload: AdminInfo;
}

export interface AdminModelType extends Model {
  namespace: string;
  state: AdminModelState;
  reducers: {
    initAdminList: Reducer<AdminModelState>;
    deleteAdmin: Reducer<AdminModelState>;
    updateAdmin: Reducer<AdminModelState>;
    addAdmin: Reducer<AdminModelState>;
    [reducerName: string]: Reducer<AdminModelState>;
  };
  effects: {
    _initAdminList: Effect;
    _deleteAdmin: Effect;
    _editAdmin: Effect;
    _addAdmin: Effect;
    [effectName: string]: Effect;
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
      const newState = { ...state! };
      newState.adminList = payload;
      return newState;
    },
    deleteAdmin(state, { payload }) {
      const newState = { ...state! };
      const index = newState.adminList.indexOf(payload);
      const arr = [...newState.adminList];
      arr.splice(index, 1);
      newState.adminList = arr;
      return newState;
    },
    // 更新管理员信息
    updateAdmin(state, { payload }) {
      const newState = { ...state! };
      for (const admin of newState.adminList) {
        if (admin.id === payload.adminInfo.id) {
          const { newAdminInfo }: { newAdminInfo: AdminInfo } = payload;
          for (const key in newAdminInfo) {
            if (Object.prototype.hasOwnProperty.call(newAdminInfo, key)) {
              const newAdmin = newAdminInfo[key];
              admin[key] = newAdmin;
            }
          }
          break;
        }
      }
      return newState;
    },
    addAdmin(state, { payload }) {
      const newState = { ...state! };
      const arr = [...newState.adminList];
      arr.push(payload);
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
      yield put({ type: 'deleteAdmin', payload });
    },
    *_editAdmin({ payload }, { put, call }): Generator {
      yield call(
        AdminController.editAdmin,
        payload.adminInfo.id,
        payload.newAdminInfo,
      );
      yield put({ type: 'updateAdmin', payload });
    },
    *_addAdmin({ payload }, { put, call }): Generator {
      const result = yield call(AdminController.addAdmin, payload);
      yield put({ type: 'AddAdmin', payload: result });
    },
  },
};
export default AdminModel;
