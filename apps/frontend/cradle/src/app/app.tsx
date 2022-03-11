import { useMemo, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { loggedInUserSelector } from '@blubberfish/frontend/shared/login';
import PrivateRoutes from './routes/private';
import PublicRoutes from './routes/pubilc';

const fallback = () => null

export function App() {
  const user = useSelector(loggedInUserSelector);

  const children = useMemo(() => !user ? <PublicRoutes /> : <PrivateRoutes />, [!user])

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
