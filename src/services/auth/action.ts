import { TUser } from '../../utils/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData,
  loginUserApi,
  registerUserApi,
  logoutApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { setIsAuthChecked, setUser } from './slice';

// Получаем пользователя
export const getUserAction = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue }) => {
    const res = await getUserApi();
    if (!res?.success) {
      return rejectWithValue(res);
    }
    return res.user;
  }
);

// Авторизация
export const loginAction = createAsyncThunk(
  'auth/login',
  async (userData: TLoginData, { rejectWithValue }) => {
    const res = await loginUserApi(userData);
    // Проверка
    if (!res?.success) {
      return rejectWithValue(res);
    }
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

// Регистрация
export const registerAction = createAsyncThunk(
  'auth/register',
  async (userData: TRegisterData, { rejectWithValue }) => {
    const res = await registerUserApi(userData);
    // Проверка
    if (!res?.success) {
      return rejectWithValue(res);
    }
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

// Обновить данные профиля
export const updateUserAction = createAsyncThunk(
  'user/update',
  async (user: TRegisterData, { rejectWithValue }) => {
    const res = await updateUserApi(user);
    if (!res?.success) {
      return rejectWithValue(res);
    }
    return res;
  }
);

// Выход из профиля
export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    const res = await logoutApi();

    if (!res?.success) {
      return rejectWithValue(res);
    }
    localStorage.clear();
    deleteCookie('accessToken');
  }
);
