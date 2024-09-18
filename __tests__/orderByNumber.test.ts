import {
  getOrderByNumberSlice,
  initialState,
  TInitialState
} from '../src/services/orderByNumber/slice';
import { getOrderByNumber } from '../src/services/orderByNumber/action';
import { TOrder } from '../src/utils/types';

const ordersTest: TOrder[] = [
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

describe('getOrderByNumberSlice', () => {
  test('getOrderByNumber.pending', () => {
    const state = getOrderByNumberSlice.reducer(initialState, {
      type: getOrderByNumber.pending.type
    });
    expect(state.isLoading).toEqual(true);
  });

  test('getOrderByNumber.fulfilled', () => {
    const state = getOrderByNumberSlice.reducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: ordersTest }
    });
    expect(state.isLoading).toEqual(false);
    expect(state.orders).toEqual(ordersTest);
  });

  test('getOrderByNumber.rejected', () => {
    const state = getOrderByNumberSlice.reducer(initialState, {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.isLoading).toEqual(false);
    expect(state.errorMessage).toEqual('Ошибка');
  });
});
