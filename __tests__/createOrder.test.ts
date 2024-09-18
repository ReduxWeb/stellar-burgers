import {
  createOrderSlice,
  initialState,
  TInitialState
} from '../src/services/createOrder/slice';
import { createOrderBurger } from '../src/services/createOrder/action';
import { TOrder } from '../src/utils/types';

const orderTest: TOrder = {
  _id: '12345',
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-10-01T12:00:00Z',
  updatedAt: '2023-10-01T12:00:00Z',
  number: 12345,
  ingredients: ['ingredient1', 'ingredient2']
};

describe('Test createOrderSlice', () => {
  test('createOrderBurger(pending)', () => {
    const state = createOrderSlice.reducer(initialState, {
      type: createOrderBurger.pending.type
    });
    expect(state.isLoading).toEqual(true);
  });

  test('createOrderBurger(fulfilled)', () => {
    const state = createOrderSlice.reducer(initialState, {
      type: createOrderBurger.fulfilled.type,
      payload: { order: orderTest }
    });
    expect(state.isLoading).toEqual(false);
    expect(state.order).toEqual(orderTest);
  });

  test('createOrderBurger(rejected)', () => {
    const state = createOrderSlice.reducer(initialState, {
      type: createOrderBurger.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.isLoading).toEqual(false);
    expect(state.errorMessage).toEqual('Ошибка');
  });

  test('Test clearOrder', () => {
    const stateWithOrder = createOrderSlice.reducer(initialState, {
      type: createOrderBurger.fulfilled.type,
      payload: { order: orderTest }
    });
    const state = createOrderSlice.reducer(
      stateWithOrder,
      createOrderSlice.actions.clearOrder()
    );
    expect(state.isLoading).toEqual(false);
    expect(state.order).toEqual(null);
    expect(state.errorMessage).toEqual(null);
  });
});
