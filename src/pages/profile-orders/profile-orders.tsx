import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrdersUserAction } from '../../services/orders/action';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(getOrdersUserAction());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
