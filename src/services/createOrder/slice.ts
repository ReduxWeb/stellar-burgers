import { createSlice } from '@reduxjs/toolkit';
import { createOrderBurger } from './action';
import { TOrder } from '@utils-types';

export type TInitialState = {
  order: TOrder | null;
  isLoading: boolean;
  errorMessage?: string | null;
};

export const initialState: TInitialState = {
  order: null,
  isLoading: false
};

export const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.isLoading = false;
      state.order = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createOrderBurger.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
        state.errorMessage = null;
      })
      .addCase(createOrderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || null;
      });
  },
  selectors: {
    getOrder: (state) => state.order
  }
});

export const { getOrder } = createOrderSlice.selectors;
export const { clearOrder } = createOrderSlice.actions;
