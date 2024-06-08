export interface IResponseGetAll<data> {
  data: data[];
  pages: number;
  page: number;
  rows: number;
  limit: number;
}
