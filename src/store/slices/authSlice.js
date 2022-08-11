import { createSlice } from '@reduxjs/toolkit';

const authState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logOut: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
