import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserAction,
  loginAction,
  logoutAction,
  registerAction,
  updateUserAction
} from './action';

type TInitialState = {
  user: TUser | null;
  isLoading: boolean;
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  errorMessage?: string | null;
};

const initialState: TInitialState = {
  user: null,
  isLoading: false,
  isAuthChecked: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAction.pending, (state) => {
        state.isLoading = true;
        state.isAuthChecked = false;
        state.errorMessage = null;
      })
      .addCase(getUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(getUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.errorMessage = action.error.message;
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.isAuthChecked = false;
        state.errorMessage = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.error.message || 'Не удалось авторизоваться.';
      })
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.error.message || 'Не удалось зарегестрироваться.';
      })
      .addCase(logoutAction.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.user = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || 'Не удалость выйти.';
      })
      .addCase(updateUserAction.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.error.message || 'Не удалось обновить данные.';
      });
  },
  selectors: {
    userData: (state) => state.user,
    isLoadingPage: (state) => state.isLoading,
    errorMessage: (state) => state.errorMessage,
    isAuthChecked: (state) => state.isAuthChecked
  }
});

export const { userData, isAuthChecked, errorMessage, isLoadingPage } =
  authSlice.selectors;
