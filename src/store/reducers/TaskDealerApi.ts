import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UpdateUserType } from '../../types/UsersTypes';
import { SignUpResType } from '../../types/AuthTypes';
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
    getUserById: builder.query<SignUpResType, string>({
      query: (id) => ({ url: `users/${id}` }),
    }),
    updateUser: builder.mutation<UpdateUserType, Partial<UpdateUserType>>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `users/${id}`,
          method: 'PUT',
          body,
        };
      },
    }),
    deleteUser: builder.mutation<{ id: string }, string>({
      query(id) {
        return {
          url: `users/${id}`,
          method: 'DELETE',
        };
      },
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
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = taskDealerApi;
