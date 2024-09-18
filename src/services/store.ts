import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/slice';
import { burgerConstructorSlice } from './burgerConstructor/slice';
import { ordersSlice } from './orders/slice';
import { feedSlice } from './feed/slice';
import { ingredientsSlice } from './ingredients/slice';
import { getOrderByNumberSlice } from './orderByNumber/slice';
import { createOrderSlice } from './createOrder/slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  [ordersSlice.reducerPath]: ordersSlice.reducer,
  [feedSlice.reducerPath]: feedSlice.reducer,
  [getOrderByNumberSlice.reducerPath]: getOrderByNumberSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [createOrderSlice.reducerPath]: createOrderSlice.reducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
