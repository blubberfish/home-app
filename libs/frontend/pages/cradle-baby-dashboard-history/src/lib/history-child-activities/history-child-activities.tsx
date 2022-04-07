import { Navigate } from 'react-router-dom';
import { useChild } from './hooks';

const ChildHistoryPage = () => {
  const baby = useChild();

  if (!baby) {
    return <Navigate to=".." />;
  }
  return null;
};

export default ChildHistoryPage;
