import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../utils/burger-api';

export const getOrdersUserAction = createAsyncThunk(
  'orders/getOrder',
  async () => getOrdersApi()
);
