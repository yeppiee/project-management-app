import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateBoardType, Board } from '../../types/BoardsTypes';
import { RootState } from '../store';

const BASE_URL = 'https://react-final-back2.herokuapp.com/';

export const taskDealerApi = createApi({
  reducerPath: 'taskDealerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { tokenStatus } = (getState() as RootState).userSlice;
      if (tokenStatus) {
        headers.set(
          'authorization',
          `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZjNlODcwZC04MzljLTRjMmQtYmM3Yi0zZWUxNjI2N2U2ZjMiLCJsb2dpbiI6InVzZXIiLCJpYXQiOjE2NTM0MDA2NjR9.xVKdwwlsRxjcZdcsYFt0vc0vx3sbc0WXg4GxYecyrfM'}`
        );
      }
      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = taskDealerApi;
