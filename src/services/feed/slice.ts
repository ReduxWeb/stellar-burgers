import { createSlice } from '@reduxjs/toolkit';
import { getFeeds } from './action';
import { TOrder } from '@utils-types';

export type TInitialState = {
  feeds: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  errorMessage?: string | null;
};

export const initialState: TInitialState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      });
  },
  selectors: {
    getFeedsState: (state) => state.feeds,
    getFeedTotal: (state) => state.total,
    getFeedsTotalToday: (state) => state.totalToday
  }
});

export const { getFeedsState, getFeedTotal, getFeedsTotalToday } =
  feedSlice.selectors;
