export type CreateBoardType = {
  title: string;
  description: string;
};

export type Board = CreateBoardType & { id: string };
