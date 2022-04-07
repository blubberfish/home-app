import { Navigate } from 'react-router-dom';
import { CellGrid } from './components/grid';
import { useChild } from './hooks';

const ChildHistoryPage = () => {
  const baby = useChild();

  if (!baby) {
    return <Navigate to=".." />;
  }
  return <CellGrid />;
};

export default ChildHistoryPage;
