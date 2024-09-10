import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getIngredientsConstructorLoading,
  getIngredientsConstructor,
  setOrderRequest,
  setModalData,
  clearConstructor
} from '../../services/burgerConstructor/slice';
import { getOrder, clearOrder } from '../../services/createOrder/slice';
import { createOrderBurger } from '../../services/createOrder/action';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getIngredientsConstructor);
  const orderRequest = useSelector(getIngredientsConstructorLoading);
  const orderModalData = useSelector(getOrder);
  const isAuth = useSelector((state) => state.auth.isAuthChecked);

  const onOrderClick = () => {
    const { bun, ingredients } = constructorItems;

    if (!isAuth) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    if (isAuth && bun && ingredients.length > 0) {
      const ingredientIds = ingredients.map((item) => item._id);
      const order: string[] = [bun._id, ...ingredientIds, bun._id];
      dispatch(createOrderBurger(order));
      console.log(order);
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
