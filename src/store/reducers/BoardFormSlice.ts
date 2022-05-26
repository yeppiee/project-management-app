import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board } from '../../types/BoardsTypes';

const initialState = {
  createBoardModalIsOpen: false,
  updateBoardModalIsOpen: false,
  updateData: {
    id: '',
    title: '',
    description: '',
  },
  deleteData: {
    id: '',
    title: '',
    description: '',
  },
};

export const boardFormSlice = createSlice({
  name: 'boardForm',
  initialState,
  reducers: {
    changeCreateBoardModalIsOpen(state, action: PayloadAction<boolean>) {
      state.createBoardModalIsOpen = action.payload;
    },
    changeUpdateBoardModalIsOpen(state, action: PayloadAction<boolean>) {
      state.updateBoardModalIsOpen = action.payload;
    },
    changeUpdateData(state, action: PayloadAction<Board>) {
      state.updateData = action.payload;
    },
    changeDeleteData(state, action: PayloadAction<Board>) {
      state.deleteData = action.payload;
    },
  },
});

export default boardFormSlice.reducer;
