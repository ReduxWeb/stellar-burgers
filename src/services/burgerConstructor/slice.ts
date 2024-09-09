import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

type TInitialState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  errorMessage?: string | null;
};

export const initialState: TInitialState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  isLoading: false
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    addBun: (state, action) => {
      state.constructorItems.bun = action.payload;
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },
    setModalData: (state, action) => {
      state.orderModalData = action.payload;
    },
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.orderRequest = false;
      state.orderModalData = null;
    },
    moveIngredient: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = state.constructorItems.ingredients;
      const [movedIngredient] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedIngredient);
      state.constructorItems.ingredients = ingredients;
    }
  }
});
export const {
  addBun,
  addIngredients,
  removeIngredient,
  setOrderRequest,
  setModalData,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
