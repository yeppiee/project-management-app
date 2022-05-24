export type CreateColumnType = {
  boardId: string;
  title: string;
};
export type DeleteColumnType = {
  columnId: string;
  boardId: string;
};
export type DeleteTaskType = DeleteColumnType & {
  taskId: string;
};
export type TaskResponse = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
};
export type CreateColumnResponseType = {
  id: string;
  title: string;
  order: number;
  tasks: TaskResponse[];
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
export type CreateTaskType = {
  columnId: string;
  boardId: string;
  title: string;
  description: string;
  userId: string;
};

export type UsersDataType = {
  id: string;
  name: string;
  login: string;
};
