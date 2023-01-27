const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isModalAddTransactionOpen: false,
  isModalLogoutOpen: false,
};
const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    toggleModalAddTransactionOpen(state) {
      state.isModalAddTransactionOpen = !state.isModalAddTransactionOpen;
    },
    toggleModalLogoutOpen(state) {
      state.isModalLogoutOpen = !state.isModalLogoutOpen;
    },
  },
});
export const { toggleModalAddTransactionOpen, toggleModalLogoutOpen } =
  globalSlice.actions;
export const globalReducer = globalSlice.reducer;
