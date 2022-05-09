import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  userLoginStatus: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserLoginStatus(state, action: PayloadAction<boolean>) {
      state.userLoginStatus = action.payload;
    },
  },
});

export default userSlice.reducer;
