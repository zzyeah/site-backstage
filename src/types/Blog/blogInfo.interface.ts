export interface BlogInfo {
  title: string;
  description: string;
  htmlContent: string;
  thumb: string;
  scanNumber: number;
  commentNumber: number;
  createDate: string;
  categoryId?: number;
}
