import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  userLoginStatus: false,
  tokenStatus: false,
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
  },
});

export default userSlice.reducer;
