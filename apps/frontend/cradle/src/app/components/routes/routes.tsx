import { Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { currentUserSelector } from '@blubberfish/frontend/modules/shared/session';
import { PrivateRoutes } from './components/private';
import { PublicRoutes } from './components/public';

const Empty = () => null;

export function AppRoutes() {
  const currentUser = useSelector(currentUserSelector);
  const routes = useMemo(
    () => (currentUser ? <PrivateRoutes /> : <PublicRoutes />),
    [currentUser]
  );
  return (
    <BrowserRouter>
      <Suspense fallback={<Empty />}>{routes}</Suspense>
    </BrowserRouter>
  );
}
