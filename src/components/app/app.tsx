import { ConstructorPage, NotFound404, Login, Register } from '@pages';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();
  const background = location.state?.background;
  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route index element={<ConstructorPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>
      ;
    </>
  );
};

export default App;
