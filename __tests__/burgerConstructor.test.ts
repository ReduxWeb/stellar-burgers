import {
  TOrder,
  TConstructorIngredient,
  TIngredient
} from './../src/utils/types';
import { expect, test, describe } from '@jest/globals';
import {
  burgerConstructorSlice,
  TInitialState,
  initialState,
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setModalData,
  moveUpIngredient,
  moveDownIngredient,
  clearConstructor
} from '../src/services/burgerConstructor/slice';

const bunTest: TIngredient = {
  _id: '1',
  type: 'bun',
  name: 'Test Bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'test-bun.png',
  image_mobile: 'test-bun-mobile.png',
  image_large: 'test-bun-large.png'
};

const ingredientTest: TIngredient = {
  _id: '2',
  type: 'main',
  name: 'Test Ingredient',
  proteins: 5,
  fat: 5,
  carbohydrates: 5,
  calories: 50,
  price: 50,
  image: 'test-ingredient.png',
  image_mobile: 'test-ingredient-mobile.png',
  image_large: 'test-ingredient-large.png'
};

const orderTest: TOrder = {
  _id: '12345',
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-10-01T12:00:00Z',
  updatedAt: '2023-10-01T12:00:00Z',
  number: 12345,
  ingredients: ['ingredient1', 'ingredient2']
};

describe('burgerConstructorSlice', () => {
  test('addIngredient with bun', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bunTest)
    );
    if (state.constructorItems.bun) {
      const { id, ...expectedBun } = state.constructorItems.bun;
      expect(expectedBun).toEqual(bunTest);
    } else {
      fail('Bun should not be null');
    }
  });

  test('addIngredient with ingredient', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredientTest)
    );
    const { id, ...expectedIngredient } = state.constructorItems.ingredients[0];
    expect(expectedIngredient).toEqual(ingredientTest);
  });

  test('removeIngredient', () => {
    const stateWithIngredient = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredientTest)
    );
    const ingredientToRemove =
      stateWithIngredient.constructorItems.ingredients[0];
    const state = burgerConstructorSlice.reducer(
      stateWithIngredient,
      removeIngredient(ingredientToRemove)
    );
    expect(state.constructorItems.ingredients).not.toContain(
      ingredientToRemove
    );
  });

  test('setOrderRequest', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      setOrderRequest(true)
    );
    expect(state.orderRequest).toEqual(true);
  });

  test('setModalData', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      setModalData(orderTest)
    );
    expect(state.orderModalData).toEqual(orderTest);
  });

  test('clearConstructor', () => {
    const stateWithData = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredientTest)
    );
    const state = burgerConstructorSlice.reducer(
      stateWithData,
      clearConstructor()
    );
    expect(state.constructorItems.bun).toEqual(null);
    expect(state.constructorItems.ingredients).toEqual([]);
    expect(state.orderRequest).toEqual(false);
    expect(state.orderModalData).toEqual(null);
  });

  test('moveUpIngredient', () => {
    const stateWithIngredients = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredientTest)
    );
    const stateWithSecondIngredient = burgerConstructorSlice.reducer(
      stateWithIngredients,
      addIngredient({
        _id: '3',
        type: 'main',
        name: 'Second Test Ingredient',
        proteins: 5,
        fat: 5,
        carbohydrates: 5,
        calories: 50,
        price: 50,
        image: 'second-test-ingredient.png',
        image_mobile: 'second-test-ingredient-mobile.png',
        image_large: 'second-test-ingredient-large.png'
      })
    );
    const state = burgerConstructorSlice.reducer(
      stateWithSecondIngredient,
      moveUpIngredient(1)
    );
    expect(state.constructorItems.ingredients[0].name).toEqual(
      'Second Test Ingredient'
    );
    expect(state.constructorItems.ingredients[1].name).toEqual(
      'Test Ingredient'
    );
  });

  test('moveDownIngredient', () => {
    const stateWithIngredients = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredientTest)
    );
    const stateWithSecondIngredient = burgerConstructorSlice.reducer(
      stateWithIngredients,
      addIngredient({
        _id: '3',
        type: 'main',
        name: 'Second Test Ingredient',
        proteins: 5,
        fat: 5,
        carbohydrates: 5,
        calories: 50,
        price: 50,
        image: 'second-test-ingredient.png',
        image_mobile: 'second-test-ingredient-mobile.png',
        image_large: 'second-test-ingredient-large.png'
      })
    );
    const state = burgerConstructorSlice.reducer(
      stateWithSecondIngredient,
      moveDownIngredient(0)
    );
    expect(state.constructorItems.ingredients[0].name).toEqual(
      'Second Test Ingredient'
    );
    expect(state.constructorItems.ingredients[1].name).toEqual(
      'Test Ingredient'
    );
  });
});
