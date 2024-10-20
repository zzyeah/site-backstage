import { AdminInfo } from '../Admin/adminInfo.interface';

export interface initialState<T = AdminInfo> {
  name: string;
  avatar: string;
  adminInfo: T;
}
