import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './action';
import { TIngredient } from '@utils-types';

type TInitialState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  errorMessage?: string | null;
};

const initialState: TInitialState = {
  ingredients: [],
  isLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      });
  },
  selectors: {
    getIngredientsState: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.isLoading
  }
});

export const { getIngredientsState, getIngredientsLoading } =
  ingredientsSlice.selectors;
