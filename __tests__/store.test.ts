import { expect, test, describe } from '@jest/globals';
import store, { rootReducer } from './../src/services/store';

describe('rootReducer', () => {
  test('Проверка правильной инициализации rootReducer', () => {
    const initialState = store.getState();
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });
});
