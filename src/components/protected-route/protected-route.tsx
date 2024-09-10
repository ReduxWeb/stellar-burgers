import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { getUserData, isAuthChecked } from '../../services/auth/slice';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: TProtectedRouteProps) => {
  const location = useLocation();
  const authChecked = useSelector(isAuthChecked);
  const user = useSelector(getUserData);
  const from = location.state?.from || { pathname: '/' };

  if (user && onlyUnAuth) {
    return <Navigate to={from} state={location} replace />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (user && !authChecked) {
    return <Preloader />;
  }

  return children;
};
