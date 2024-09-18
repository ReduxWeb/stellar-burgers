import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData } from '../../services/auth/slice';

export const AppHeader: FC = () => {
  const user = useSelector(getUserData);
  const userName = user?.name ?? 'Личный кабинет';
  return <AppHeaderUI userName={userName} />;
};
