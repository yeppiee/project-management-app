export type CreateColumnType = {
  boardId: string;
  title: string;
};
export type DeleteColumnType = {
  columnId: string;
  boardId: string;
};
export type CreateColumnResponseType = {
  id: string;
  title: string;
  order: number;
};
export type UpdateColumnType = {
  columnId: string;
  boardId: string;
  column?: CreateColumnResponseType;
  title: string;
  order: number;
};
export type DeleteColumnResponseType = {
  statusCode: number;
  message: string;
};
