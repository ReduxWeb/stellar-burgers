import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const createOrderBurger = createAsyncThunk(
  'order/create',
  async (order: string[]) => orderBurgerApi(order)
);
