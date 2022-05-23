import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CreateColumnResponseType,
  CreateColumnType,
  DeleteColumnResponseType,
  DeleteColumnType,
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
          `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZjNlODcwZC04MzljLTRjMmQtYmM3Yi0zZWUxNjI2N2U2ZjMiLCJsb2dpbiI6InVzZXIiLCJpYXQiOjE2NTMxNDI1OTd9.LK8BWTWf1X0j1ca7AY_aN-tSeMrEmWL08A7YNtxePFE'}`
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
    createColumn: build.mutation<CreateColumnResponseType, CreateColumnType>({
      query: ({ boardId, title }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body: { title },
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
    /*  createTask: build.mutation<CreateColumnResponseType, CreateColumnType>({
      query: ({ boardId, title }) => ({
        url: `boards/${boardId}/columns`,
        method: 'POST',
        body: { title },
      }),
    }), */
  }),
});

export const {
  useGetBoardQuery,
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} = taskDealerApi;
