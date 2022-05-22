import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board } from '../../types/BoardsTypes';
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
          `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZjNlODcwZC04MzljLTRjMmQtYmM3Yi0zZWUxNjI2N2U2ZjMiLCJsb2dpbiI6InVzZXIiLCJpYXQiOjE2NTMxNDI1OTd9.LK8BWTWf1X0j1ca7AY_aN-tSeMrEmWL08A7YNtxePFE'}`
        );
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllBoards: builder.query<Board[], null>({
      query: () => `boards`,
    }),
  }),
});

export const { useGetAllBoardsQuery } = taskDealerApi;
