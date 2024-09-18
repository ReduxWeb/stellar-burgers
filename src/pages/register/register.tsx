import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { registerAction } from '../../services/auth/action';
import { RegisterUI } from '@ui-pages';
import { Preloader } from '@ui';
import { errorMessage, isLoadingPage } from '../../services/auth/slice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingPage);
  const error = useSelector(errorMessage);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerAction({ email, name: userName, password }));
  };
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
