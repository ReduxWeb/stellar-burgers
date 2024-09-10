import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const getFeeds = createAsyncThunk('feed/get', async () => getFeedsApi());
