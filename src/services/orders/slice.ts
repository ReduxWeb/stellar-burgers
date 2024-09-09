import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersUserAction } from './action';

type TOrderState = {
  orders: TOrder[] | [];
  isLoading: boolean;
  errors?: string | null;
};

const initialState: TOrderState = {
  orders: [],
  isLoading: false,
  errors: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrdersUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error.message;
      });
  }
});

export const orderReducer = ordersSlice.reducer;
