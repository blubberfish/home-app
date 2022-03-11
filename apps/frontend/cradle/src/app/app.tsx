import { useSelector } from 'react-redux';
import { loggedInUserSelector } from '@blubberfish/frontend/shared/login';
import PrivateRoutes from './routes/private';
import PublicRoutes from './routes/pubilc';

export function App() {
  const user = useSelector(loggedInUserSelector);
  return user ? <PrivateRoutes /> : <PublicRoutes />;
}
