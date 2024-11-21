export interface BlogInfo {
  title: string;
  description: string;
  htmlContent: string;
  thumb: string;
  scanNumber: number;
  commentNumber: number;
  createDate: number;
  toc?: any[];
  categoryId?: number;
  markdownContent?: string;
}
