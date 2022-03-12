import { useMemo, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@blubberfish/frontend/modules/login';
import PrivateRoutes from './routes/private';
import PublicRoutes from './routes/pubilc';

const Fallback = () => null

export default function App() {
  const isUserLoggedIn = !!useSelector(currentUserSelector);
  const children = useMemo(() => !isUserLoggedIn ? <PublicRoutes /> : <PrivateRoutes />, [isUserLoggedIn])

  return <Suspense fallback={<Fallback />}>{children}</Suspense>;
}
