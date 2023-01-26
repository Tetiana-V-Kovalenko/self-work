import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://wallet.goit.ua/';
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};
export const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: 'api/auth/sign-up',
      data: credentials,
    });
    token.set(data.token);
    return data;
  } catch (error) {}
});
export const getCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'api/users/current',
      });

      return data;
    } catch (error) {}
  }
);
