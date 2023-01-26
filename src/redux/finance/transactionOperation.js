import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTransaction = createAsyncThunk(
  'finance/fetchAllTransactions',
  async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'api/transactions',
      });

      return data;
    } catch (error) {}
  }
);
export const addTransaction = createAsyncThunk(
  'finance/addTransaction',
  async transaction => {
    try {
      const { data } = await axios({
        method: 'POST',
        url: '/api/transactions',
        data: transaction,
      });

      return data;
    } catch (error) {}
  }
);
export const deleteTransaction = createAsyncThunk(
  'finance/deleteTransaction',
  async transactionId => {
    try {
      const { data } = await axios({
        method: 'DELETE',
        url: `api/transactions/${transactionId}`,
      });

      return data;
    } catch (error) {}
  }
);
export const getTransactionCategories = createAsyncThunk(
  'finance/getCategories',
  async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'api/transaction-categories',
      });
      return data;
    } catch (error) {}
  }
);
