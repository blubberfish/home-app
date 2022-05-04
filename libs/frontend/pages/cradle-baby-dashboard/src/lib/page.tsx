import { Module } from '@blubberfish/frontend/modules/core';
import {
  accountIdSelector,
  accountInfoThunk,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import { DASHBOARD_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout';
import slice from './redux';

const ActivitiesPage = lazy(
  () => import('@blubberfish/frontend/pages/cradle-baby-dashboard-activities')
);
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
          <Route path={`${DASHBOARD_PATH.FAMILY}/*`} element={<FamilyPage />} />
          <Route
            path={`${DASHBOARD_PATH.ACTIVITIES}/*`}
            element={<ActivitiesPage />}
          />
          <Route
            path={`${DASHBOARD_PATH.HISTORY}/*`}
            element={<HistoryPage />}
          />
          <Route path={`${DASHBOARD_PATH.SETTINGS}/*`} element={<Empty />} />
          <Route path="*" element={<Navigate to={DASHBOARD_PATH.FAMILY} />} />
        </Route>
      </Routes>
    </Module>
  );
};
