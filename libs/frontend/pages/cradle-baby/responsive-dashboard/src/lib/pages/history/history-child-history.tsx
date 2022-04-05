import { selectChildById } from '@blubberfish/frontend/modules/cradle-baby/app';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

const ChildHistoryPage = () => {
  const params = useParams();
  const baby = useSelector(selectChildById(params['uuid']));
  console.log(baby);

  if (!baby) {
    return <Navigate to=".." />;
  }
  return null;
};

export default ChildHistoryPage;
