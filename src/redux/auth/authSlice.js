import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, register } from './authOperation';

const initialState = {
  user: {
    username: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    //   [logIn.fulfilled](state, action) {
    //     state.user = action.payload.user;
    //     state.token = action.payload.token;
    //     state.isLoggedIn = true;
    //   },
    //   [logOut.fulfilled](state) {
    //     state.user = {
    //       name: null,
    //       email: null,
    //     };
    //     state.token = null;
    //     state.isLoggedIn = false;
    //   },
    [getCurrentUser.fulfilled](state, action) {
      state.user = { ...action.payload };
      state.isLoggedIn = true;
    },
  },
});
export const authReducer = authSlice.reducer;
