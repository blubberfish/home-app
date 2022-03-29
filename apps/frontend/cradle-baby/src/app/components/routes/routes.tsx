import { Suspense, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  accountIdSelector,
  accountInfoThunk,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import PublicRoutes from './public';
import PrivateRoutes from './private';

const Empty = () => null;

export default () => {
  const dispatch = useDispatch();
  const accountId = useSelector(accountIdSelector);
  const content = useMemo(
    () => (accountId ? <PrivateRoutes /> : <PublicRoutes />),
    [accountId]
  );
  useEffect(() => {
    accountId && dispatch(accountInfoThunk(accountId));
  }, [accountId, dispatch]);
  return <Suspense fallback={<Empty />}>{content}</Suspense>;
};
