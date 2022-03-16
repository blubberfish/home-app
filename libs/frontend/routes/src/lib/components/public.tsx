import { Routes, Route } from 'react-router-dom';
export const PublicRoutes = () => {
  return (
    <Routes>
      <Route index element={<div>PUBLIC ROUTE</div>} />
    </Routes>
  );
};
