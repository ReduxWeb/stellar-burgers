import { createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '@api';

export const getOrdersUserAction = createAsyncThunk(
  'orders/getOrder',
  async () => {
    const res = await getOrdersApi();
    return res;
  }
);
