import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateBoardType, Board } from '../../types/BoardsTypes';
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
  tagTypes: ['Post'],
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
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetAllBoardsQuery, useCreateBoardMutation } = taskDealerApi;
