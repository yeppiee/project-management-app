import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateBoardType, Board, CreateColumnResponseType,
  CreateColumnType,
  CreateTaskType,
  DeleteColumnResponseType,
  DeleteColumnType,
  DeleteTaskType,
  UpdateColumnType,
  UpdateTaskAndColumn,
  UpdateTaskType } from '../../types/BoardsTypes';
import { RootState } from '../store';

const BASE_URL = 'https://react-final-back3.herokuapp.com/';

export const taskDealerApi = createApi({
  reducerPath: 'taskDealerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { tokenStatus } = (getState() as RootState).userSlice;
      const { token } = (getState() as RootState).userSlice;
      if (tokenStatus) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Post', 'Board'],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
    }),
    getAllBoards: builder.query<Board[], null>({
      query: () => 'boards',
      providesTags: () => ['Post'],
    }),
    createBoard: builder.mutation<Board, CreateBoardType>({
      query: (board) => ({
        url: 'boards',
        method: 'POST',
        body: board,
      }),
      invalidatesTags: ['Post'],
    }),
    deleteBoard: builder.mutation<Board, string>({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    updateBoard: builder.mutation<Board, Board>({
      query: ({ id, title, description }) => ({
        url: `boards/${id}`,
        method: 'PUT',
        body: { title, description },
      }),
      invalidatesTags: ['Post'],
    }),
    getBoard: builder.query({
      query: (id) => ({
        url: `boards/${id}`,
      }),
      providesTags: ['Board'],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: '/users',
      }),
    }),
    createColumn: builder.mutation<CreateColumnResponseType, CreateColumnType>({
      query: ({ boardId, title }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Board'],
    }),
    createTask: builder.mutation<CreateColumnResponseType, CreateTaskType>({
      query: ({ boardId, columnId, title, description, userId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: {
          title,
          description,
          userId,
        },
      }),
      invalidatesTags: ['Board'],
    }),
    updateColumn: builder.mutation<CreateColumnResponseType, UpdateColumnType>({
      query: ({ boardId, columnId, order, title }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: { title, order },
      }),
      invalidatesTags: ['Board'],
    }),
    deleteColumn: builder.mutation<DeleteColumnResponseType, DeleteColumnType>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
    deleteTask: builder.mutation<DeleteColumnResponseType, DeleteTaskType>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
    updateTask: builder.mutation<DeleteColumnResponseType, UpdateTaskType>({
      query: ({ boardId, columnId, id, title, order, description, userId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${id}`,
        method: 'PUT',
        body: { boardId, columnId, title, order, description, userId },
      }),
      invalidatesTags: ['Board'],
    }),
    updateTaskAndColumn: builder.mutation<DeleteColumnResponseType, UpdateTaskAndColumn>({
      query: ({ boardId, column, columnId, id, title, order, description, userId }) => ({
        url: `boards/${boardId}/columns/${column}/tasks/${id}`,
        method: 'PUT',
        body: { boardId, columnId, title, order, description, userId },
      }),
      invalidatesTags: ['Board'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  useGetBoardQuery,
  useGetAllUsersQuery,
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskAndColumnMutation,
} = taskDealerApi;
