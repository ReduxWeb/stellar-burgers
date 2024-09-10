import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

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
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== payload.id
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
  },
  selectors: {
    getIngredientsConstructor: (state) => state.constructorItems,
    getIngredientsConstructorLoading: (state) => state.isLoading
  }
});

export const { getIngredientsConstructor, getIngredientsConstructorLoading } =
  burgerConstructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setModalData,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
