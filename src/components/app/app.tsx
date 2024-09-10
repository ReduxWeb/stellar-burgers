import {
  ConstructorPage,
  NotFound404,
  Login,
  Register,
  Feed,
  ResetPassword,
  ForgotPassword,
  Profile,
  ProfileOrders
} from '@pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails } from '@components';
import { getUserAction } from '../../services/auth/action';
import { getIngredients } from '../../services/ingredients/action';

const App = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserAction());
  }, [dispatch]);
  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route index element={<ConstructorPage />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
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
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
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
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
