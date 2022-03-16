import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom';

const LoginPage = lazy(() => import('@blubberfish/frontend/pages/public/login'))


export const PublicRoutes = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
    </Routes>
  );
};
