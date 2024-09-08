import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  errorMessage?: string | null;
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    constructorState: (state) => state.constructorItems,
    constructorLoading: (state) => state.isLoading
  },
  reducers: {
    // Добавить
    addIngredient: {
      reducer: (
        state: TBurgerConstructorState,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    // Удалить
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    // Очистить
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    },
    // Обновить
    updateAll: (state, action: PayloadAction<TConstructorIngredient[]>) => {
      state.constructorItems.ingredients = action.payload;
    }
  }
});

export const { addIngredient, removeIngredient, clearConstructor, updateAll } =
  burgerConstructorSlice.actions;

export const { constructorState, constructorLoading } =
  burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
