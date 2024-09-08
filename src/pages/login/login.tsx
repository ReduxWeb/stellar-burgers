import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { loginAction } from '../../services/auth/action';
import { LoginUI } from '@ui-pages';
import { Preloader } from '@ui';
import { errorMessage, isLoadingPage } from '../../services/auth/slice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingPage);
  const error = useSelector(errorMessage);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
