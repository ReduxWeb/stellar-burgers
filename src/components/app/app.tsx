import {
  ConstructorPage,
  NotFound404,
  Login,
  Register,
  Feed,
  ResetPassword,
  Profile
} from '@pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { getUserAction } from '../../services/auth/action';
import { isAuthChecked } from '../../services/auth/slice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();
  const background = location.state?.background;
  const authChecked = useSelector(isAuthChecked);

  useEffect(() => {
    if (!authChecked) {
      dispatch(getUserAction());
    }
  }, [dispatch, authChecked]);
  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route index element={<ConstructorPage />} />
          <Route path='/feed'>
            <Route index element={<Feed />} />
          </Route>
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='/forgot-password' element={<ResetPassword />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>
      ;
    </>
  );
};

export default App;
