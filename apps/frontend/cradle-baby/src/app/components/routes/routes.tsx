import { Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { accountIdSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import PublicRoutes from './public';
import PrivateRoutes from './private';

const Empty = () => null;

export default () => {
  const isLoggedIn = !!useSelector(accountIdSelector);
  const content = useMemo(
    () => (isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />),
    [isLoggedIn]
  );
  return <Suspense fallback={<Empty />}>{content}</Suspense>;
};
