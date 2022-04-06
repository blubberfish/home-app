import { Module } from '@blubberfish/frontend/modules/core';
import {
  accountIdSelector,
  accountInfoThunk,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout';
import slice from './redux';
import { PATH } from './routes';

const FamilyPage = lazy(
  () => import('@blubberfish/frontend/pages/cradle-baby-dashboard-family')
);
const HistoryPage = lazy(
  () => import('@blubberfish/frontend/pages/cradle-baby-dashboard-history')
);
const Empty = () => null;

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const accountId = useSelector(accountIdSelector);
  useEffect(() => {
    accountId && dispatch(accountInfoThunk(accountId));
  }, [accountId, dispatch]);
  return (
    <Module slice={slice}>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path={`${PATH.FAMILY}/*`} element={<FamilyPage />} />
          <Route path={`${PATH.ACTIVITIES}/*`} element={<Empty />} />
          <Route path={`${PATH.HISTORY}/*`} element={<HistoryPage />} />
          <Route path="*" element={<Navigate to="family" />} />
        </Route>
      </Routes>
    </Module>
  );
};
