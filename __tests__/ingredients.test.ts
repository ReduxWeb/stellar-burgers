import {
  ingredientsSlice,
  initialState,
  TInitialState
} from '../src/services/ingredients/slice';
import { getIngredients } from '../src/services/ingredients/action';
import { TIngredient } from '../src/utils/types';

const ingredientsTest: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: 'test-ingredient-1.png',
    image_mobile: 'test-ingredient-1-mobile.png',
    image_large: 'test-ingredient-1-large.png'
  },
  {
    _id: '2',
    name: 'Test Ingredient 2',
    type: 'main',
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 50,
    price: 50,
    image: 'test-ingredient-2.png',
    image_mobile: 'test-ingredient-2-mobile.png',
    image_large: 'test-ingredient-2-large.png'
  }
];

describe('ingredientsSlice', () => {
  test('getIngredients.pending', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.pending.type
    });
    expect(state.isLoading).toEqual(true);
    expect(state.errorMessage).toEqual(null);
  });

  test('getIngredients.fulfilled', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.fulfilled.type,
      payload: ingredientsTest
    });
    expect(state.isLoading).toEqual(false);
    expect(state.ingredients).toEqual(ingredientsTest);
  });

  test('getIngredients.rejected', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка' }
    });
    expect(state.isLoading).toEqual(false);
    expect(state.errorMessage).toEqual('Ошибка');
  });
});
