import {
  ordersSlice,
  initialState,
  TinitialState
} from '../src/services/orders/slice';
import { getOrdersUserAction } from '../src/services/orders/action';
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

describe('ordersSlice', () => {
  test('getOrdersUserAction.pending', () => {
    const state = ordersSlice.reducer(initialState, {
      type: getOrdersUserAction.pending.type
    });
    expect(state.isLoading).toEqual(true);
  });

  test('getOrdersUserAction.fulfilled', () => {
    const state = ordersSlice.reducer(initialState, {
      type: getOrdersUserAction.fulfilled.type,
      payload: ordersTest
    });
    expect(state.isLoading).toEqual(false);
    expect(state.orders).toEqual(ordersTest);
  });

  test('getOrdersUserAction.rejected', () => {
    const state = ordersSlice.reducer(initialState, {
      type: getOrdersUserAction.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.isLoading).toEqual(false);
    expect(state.errorsMessage).toEqual('Ошибка');
  });
});
