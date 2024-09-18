import { FC } from 'react';
import { Button } from '@zlden/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './not-fount-404.module.css';

export const NotFound404: FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/', { replace: true });
  };

  return (
    <>
      <main className={styles.container}>
        <h3 className={`pb-6 text text_type_main-large`}>
          Страница не найдена. Ошибка 404.
        </h3>
        <Button
          onClick={handleNavigation}
          type='primary'
          size='medium'
          htmlType='submit'
        >
          Вернуться на главную
        </Button>
      </main>
    </>
  );
};
