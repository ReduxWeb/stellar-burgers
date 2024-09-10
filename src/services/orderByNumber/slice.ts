import { createSlice } from '@reduxjs/toolkit';
import { getOrderByNumber } from './action';
import { TOrder } from '@utils-types';

type TInitialState = {
  orders: TOrder[];
  isLoading: boolean;
  errorMessage?: string | null;
};

const initialState: TInitialState = {
  orders: [],
  isLoading: false
};

export const getOrderByNumberSlice = createSlice({
  name: 'getOrderByNumber',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrderByNumber.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      });
  },
  selectors: {
    getOrdersState: (state) => state.orders
  }
});

export const { getOrdersState } = getOrderByNumberSlice.selectors;
