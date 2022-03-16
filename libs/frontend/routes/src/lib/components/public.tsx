import { Routes, Route } from 'react-router-dom';
import { useAnimation } from '@blubberfish/frontend/hooks';

export const PublicRoutes = () => {
  const a = useAnimation({ m: 1 });
  console.log(a);

  return (
    <Routes>
      <Route index element={<div>PUBLIC ROUTE</div>} />
    </Routes>
  );
};
