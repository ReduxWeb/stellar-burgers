import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredientsState } from '../../services/ingredients/slice';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  /** TODO: взять переменную из стора */
  const ingredientData = useSelector(getIngredientsState).find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
