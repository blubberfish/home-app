import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const HomePage = lazy(() => import('@blubberfish/frontend/pages/public/home'));
const LoginPage = lazy(
  () => import('@blubberfish/frontend/pages/public/login')
);

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route element={<Navigate to="/" />} />
    </Routes>
  );
};
