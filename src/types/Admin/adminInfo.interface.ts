export interface AdminInfo {
  id: number;
  loginId: string;
  name: string;
  loginPwd: string;
  avatar?: string;
  permission: number;
  enabled: number;
  [key: string]: any;
}
