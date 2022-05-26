import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  userLoginStatus: false,
  tokenStatus: false,
  token: '',
  userId: '',
  timeToken: '',
  localization: 'en',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserLoginStatus(state, action: PayloadAction<boolean>) {
      state.userLoginStatus = action.payload;
    },
    changeTokenStatus(state, action: PayloadAction<boolean>) {
      state.tokenStatus = action.payload;
    },
    changeLocalization(state, action: PayloadAction<string>) {
      state.localization = action.payload;
    },
<<<<<<< HEAD
    changeToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    changeUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    changeTimeToken(state, action: PayloadAction<string>) {
      state.timeToken = action.payload;
    },
    changeCreateBoardModalIsOpen(state, action: PayloadAction<boolean>) {
      state.createBoardModalIsOpen = action.payload;
    },
=======
>>>>>>> 5d29371 (feat: add confirmModal, create board, delete board, change board)
  },
});

export default userSlice.reducer;
