import { Module } from '@blubberfish/frontend/modules/core';
import slice, {
  accountIdSelector,
  accountInfoThunk,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout';
import { PATH } from './routes';

const Empty = () => null;

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const accountId = useSelector(accountIdSelector);
  useEffect(() => {
    accountId && dispatch(accountInfoThunk(accountId));
  }, [accountId, dispatch]);
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path={`${PATH.FAMILY}/*`} element={<Empty />} />
        <Route path={`${PATH.ACTIVITIES}/*`} element={<Empty />} />
        <Route path={`${PATH.HISTORY}/*`} element={<Empty />} />
        <Route path="*" element={<Navigate to="family" />} />
      </Route>
    </Routes>
  );
};

export default () => (
  <Module slice={slice}>
    <DashboardPage />
  </Module>
);
