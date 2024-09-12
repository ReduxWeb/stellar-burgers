import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getIngredientsConstructor,
  clearConstructor
} from '../../services/burgerConstructor/slice';
import { getOrder, clearOrder } from '../../services/createOrder/slice';
import { createOrderBurger } from '../../services/createOrder/action';
import { useNavigate } from 'react-router-dom';
import { isAuthChecked } from '../../services/auth/slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getIngredientsConstructor);
  const orderRequest = useSelector((state) => state.createOrder.isLoading);
  const orderModalData = useSelector(getOrder);
  const isAuth = useSelector(isAuthChecked);

  const onOrderClick = () => {
    const { bun, ingredients } = constructorItems;

    if (!isAuth) {
      return navigate('/login');
    }
    console.log(isAuth);
    if (!constructorItems.bun || orderRequest) return;

    if (bun && ingredients.length > 0) {
      const ingredientIds = ingredients.map((item) => item._id);
      const order: string[] = [bun._id, ...ingredientIds, bun._id];
      dispatch(createOrderBurger(order));
      dispatch(clearConstructor());
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
