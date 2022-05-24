import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  userLoginStatus: false,
  tokenStatus: false,
  token: '',
  userId: '',
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
    changeToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    changeUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
});

export default userSlice.reducer;
