import { Routes, Route } from 'react-router-dom';

const Empty = () => null;

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route index element={<Empty />} />
    </Routes>
  );
};
