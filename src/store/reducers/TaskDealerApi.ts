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
          `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZjNlODcwZC04MzljLTRjMmQtYmM3Yi0zZWUxNjI2N2U2ZjMiLCJsb2dpbiI6InVzZXIiLCJpYXQiOjE2NTMyMTU3OTd9.AHhNNFYT4AZ5EfoQ89cRWFQivAnSCum5qbGTkJs8Nq0'}`
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
  }),
});

export const { useGetAllBoardsQuery, useCreateBoardMutation } = taskDealerApi;
