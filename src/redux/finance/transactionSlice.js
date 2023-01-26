import { createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  deleteTransaction,
  getAllTransaction,
  getTransactionCategories,
} from './transactionOperation';

const initialState = {
  totalBalance: '',
  data: [],
  categories: [],
};
const transactionSlice = createSlice({
  name: 'finance',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllTransaction.fulfilled](state, action) {
      state.data = action.payload;
    },
    [addTransaction.fulfilled](state, action) {
      state.data.push(action.payload);
    },
    [deleteTransaction.fulfilled](state, action) {
      const index = state.data.findIndex(
        transaction => transaction.id === action.payload.id
      );
      state.data.splice(index, 1);
    },
    [getTransactionCategories.fulfilled](state, action) {
      state.categories = action.payload;
    },
  },
});
export const transactionReducer = transactionSlice.reducer;
