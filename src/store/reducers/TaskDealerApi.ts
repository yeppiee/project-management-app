import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CreateColumnResponseType,
  CreateColumnType,
  CreateTaskType,
  DeleteColumnResponseType,
  DeleteColumnType,
  DeleteTaskType,
  UpdateColumnType,
} from '../../Types/BoardTypes';
import { RootState } from '../store';

const BASE_URL = 'https://react-final-back3.herokuapp.com/';

export const taskDealerApi = createApi({
  reducerPath: 'taskDealerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { tokenStatus } = (getState() as RootState).userSlice;

      if (tokenStatus) {
        headers.set(
          'authorization',
          `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTkyYmViNi1jZTZiLTQ5YTYtYjRhYy01NDQ5OTEzMGI4N2MiLCJsb2dpbiI6IkRlbmlzIiwiaWF0IjoxNjUzMzkxNDU2fQ.of2bYP_VTrbPSMUL1zcglzFXBe2fj_-aThYBgwnERug'}`
        );
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getBoard: build.query({
      query: (id) => ({
        url: `boards/${id}`,
      }),
    }),
    getAllUsers: build.query({
      query: () => ({
        url: '/users',
      }),
    }),
    createColumn: build.mutation<CreateColumnResponseType, CreateColumnType>({
      query: ({ boardId, title }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body: { title },
      }),
    }),
    createTask: build.mutation<CreateColumnResponseType, CreateTaskType>({
      query: ({ boardId, columnId, title, description, userId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: {
          title,
          description,
          userId,
        },
      }),
    }),
    updateColumn: build.mutation<CreateColumnResponseType, UpdateColumnType>({
      query: ({ boardId, columnId, order, title }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: { title, order },
      }),
    }),
    deleteColumn: build.mutation<DeleteColumnResponseType, DeleteColumnType>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
    }),
    deleteTask: build.mutation<DeleteColumnResponseType, DeleteTaskType>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBoardQuery,
  useGetAllUsersQuery,
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = taskDealerApi;
