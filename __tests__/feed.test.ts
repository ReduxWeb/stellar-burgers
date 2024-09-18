import {
  feedSlice,
  initialState,
  TInitialState
} from '../src/services/feed/slice';
import { getFeeds } from '../src/services/feed/action';
import { TOrder } from '../src/utils/types';

const feedsTest: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Test Order 1',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:00:00Z',
    number: 12345,
    ingredients: ['ingredient1', 'ingredient2']
  },
  {
    _id: '2',
    status: 'pending',
    name: 'Test Order 2',
    createdAt: '2023-10-01T12:00:00Z',
    updatedAt: '2023-10-01T12:00:00Z',
    number: 12346,
    ingredients: ['ingredient3', 'ingredient4']
  }
];

describe('feedSlice', () => {
  test('getFeeds.pending', () => {
    const state = feedSlice.reducer(initialState, {
      type: getFeeds.pending.type
    });
    expect(state.isLoading).toEqual(true);
  });

  test('getFeeds.fulfilled', () => {
    const state = feedSlice.reducer(initialState, {
      type: getFeeds.fulfilled.type,
      payload: {
        orders: feedsTest,
        total: 2,
        totalToday: 1
      }
    });
    expect(state.isLoading).toEqual(false);
    expect(state.feeds).toEqual(feedsTest);
    expect(state.total).toEqual(2);
    expect(state.totalToday).toEqual(1);
  });

  test('getFeeds.rejected', () => {
    const state = feedSlice.reducer(initialState, {
      type: getFeeds.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.isLoading).toEqual(false);
    expect(state.errorMessage).toEqual('Ошибка');
  });
});
