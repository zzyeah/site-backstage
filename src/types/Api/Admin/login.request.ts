export interface LoginRequest {
  loginId: string;
  loginPwd: string;
  captcha: string;
  remember: number;
  [key: string]: any;
}
