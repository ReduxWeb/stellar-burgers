import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (order: number) => getOrderByNumberApi(order)
);
