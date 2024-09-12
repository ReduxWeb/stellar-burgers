import { createSlice } from '@reduxjs/toolkit';
import { createOrderBurger } from './action';
import { TOrder } from '@utils-types';

type TInitialState = {
  order: TOrder | null;
  isLoading: boolean;
  errorMessage?: string | null;
};

const initialState: TInitialState = {
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
      })
      .addCase(createOrderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      });
  },
  selectors: {
    getOrder: (state) => state.order,
    getNumberOrder: (state) => state.order?.number
  }
});

export const { getOrder, getNumberOrder } = createOrderSlice.selectors;
export const { clearOrder } = createOrderSlice.actions;
