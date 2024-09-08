import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutAction } from '../../services/auth/action';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
