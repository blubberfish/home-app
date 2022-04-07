import { selectChildById } from '@blubberfish/frontend/modules/cradle-baby/app';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useChild = () => {
  const { uuid } = useParams();
  return useSelector(selectChildById(uuid));
};
