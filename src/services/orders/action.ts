import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '@api';

export const getOrdersUserAction = createAsyncThunk(
  'orders/getOrder',
  async () => getOrdersApi()
);
