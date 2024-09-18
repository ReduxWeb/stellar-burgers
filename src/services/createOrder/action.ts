import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';

export const createOrderBurger = createAsyncThunk(
  'order/create',
  async (order: string[]) => orderBurgerApi(order)
);
