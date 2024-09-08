import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData,
  loginUserApi,
  registerUserApi,
  logoutApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

// Регистрация
