import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsState } from '../../services/feed/slice';
import { getFeeds } from '../../services/feed/action';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getFeedsState);
  console.log(orders);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
