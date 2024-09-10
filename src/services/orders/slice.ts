import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersUserAction } from './action';

type TinitialState = {
  orders: TOrder[];
  isLoading: boolean;
  errorsMessage?: string | null;
};

const initialState: TinitialState = {
  orders: [],
  isLoading: false
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
        state.errorsMessage = action.error.message;
      });
  }
});

export const orderReducer = ordersSlice.reducer;
