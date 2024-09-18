import {
  getUserAction,
  registerAction,
  loginAction,
  updateUserAction,
  logoutAction
} from './../src/services/auth/action';
import {
  authSlice,
  initialState,
  TInitialState
} from '../src/services/auth/slice';

const userTest = {
  email: 'testuser@ya,ru',
  name: 'test user'
};

describe('Test getUser', () => {
  test('getUser(pending)', () => {
    const state = authSlice.reducer(initialState, {
      type: getUserAction.pending.type
    });
    expect(state.isLoading).toEqual(true);
    expect(state.isAuthChecked).toEqual(false);
    expect(state.errorMessage).toEqual(null);
  });

  test('getUser(fulfilled)', () => {
    const state = authSlice.reducer(initialState, {
      type: getUserAction.fulfilled.type,
      payload: userTest
    });
    expect(state.isLoading).toEqual(false);
    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(userTest);
    expect(state.errorMessage).toEqual(null);
  });

  test('getUser(rejected)', () => {
    const state = authSlice.reducer(initialState, {
      type: getUserAction.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.isLoading).toEqual(false);
    expect(state.isAuthChecked).toEqual(false);
    expect(state.user).toEqual(null);
    expect(state.errorMessage).toEqual('Ошибка');
  });
});

describe('Test Register', () => {
  let initialState: TInitialState;

  beforeEach(() => {
    initialState = {
      user: null,
      isLoading: false,
      isAuthChecked: false
    };
  });

  test('register (pending)', () => {
    const action = { type: registerAction.pending.type };
    const state = authSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toEqual(false);
    expect(state.errorMessage).toEqual(null);
  });

  test('register (fulfilled)', () => {
    const action = { type: registerAction.fulfilled.type, payload: userTest };
    const state = authSlice.reducer(initialState, action);

    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(userTest);
    expect(state.errorMessage).toEqual(null);
  });

  test('register (rejected)', () => {
    const action = {
      type: registerAction.rejected.type,
      error: { message: 'Не удалось зарегестрироваться.' }
    };
    const state = authSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toEqual(false);
    expect(state.errorMessage).toEqual('Не удалось зарегестрироваться.');
  });
});

describe('Test Login', () => {
  let initialState: TInitialState;

  beforeEach(() => {
    initialState = {
      user: null,
      isLoading: false,
      isAuthChecked: false
    };
  });

  test('login (pending)', () => {
    const action = { type: loginAction.pending.type };
    const state = authSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toEqual(false);
    expect(state.errorMessage).toEqual(null);
  });

  test('login (fulfilled)', () => {
    const action = { type: loginAction.fulfilled.type, payload: userTest };
    const state = authSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(userTest);
    expect(state.errorMessage).toEqual(null);
  });

  test('login (rejected)', () => {
    const action = {
      type: loginAction.rejected.type,
      error: { message: 'Не удалось авторизоваться.' }
    };
    const state = authSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toEqual(false);
    expect(state.errorMessage).toEqual('Не удалось авторизоваться.');
  });
});

describe('Test Logout', () => {
  test('logout (pending)', () => {
    const state = authSlice.reducer(initialState, {
      type: logoutAction.pending.type
    });
    expect(state.errorMessage).toEqual(null);
  });

  test('logout (fulfilled)', () => {
    const state = authSlice.reducer(initialState, {
      type: logoutAction.fulfilled.type,
      payload: {
        user: userTest
      }
    });
    expect(state.isAuthChecked).toEqual(false);
    expect(state.user).toEqual(null);
  });

  test('logout (rejected)', () => {
    const state = authSlice.reducer(initialState, {
      type: logoutAction.rejected.type,
      error: { message: 'Не удалость выйти.' }
    });
    expect(state.errorMessage).toEqual('Не удалость выйти.');
  });
});

describe('Test updateUser', () => {
  test('updateUser (pending)', () => {
    const state = authSlice.reducer(initialState, {
      type: updateUserAction.pending.type
    });
    expect(state.errorMessage).toEqual(null);
  });

  test('updateUser (fulfilled)', () => {
    const state = authSlice.reducer(initialState, {
      type: updateUserAction.fulfilled.type,
      payload: {
        user: userTest
      }
    });
    expect(state.user).toEqual(userTest);
    expect(state.errorMessage).toEqual(null);
  });

  test('updateUser (rejected)', () => {
    const state = authSlice.reducer(initialState, {
      type: updateUserAction.rejected.type,
      error: { message: 'Не удалось обновить данные.' }
    });
    expect(state.errorMessage).toEqual('Не удалось обновить данные.');
  });
});
