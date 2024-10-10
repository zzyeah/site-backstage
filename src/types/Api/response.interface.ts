export interface DefaultResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}
