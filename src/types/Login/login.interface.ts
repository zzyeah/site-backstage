export interface LoginInfo {
  loginId: string;
  loginPwd: string;
  captcha: string;
  remember: boolean;
  [key: string]: any;
}
