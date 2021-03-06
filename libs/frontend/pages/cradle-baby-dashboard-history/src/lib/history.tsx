import { Module } from '@blubberfish/frontend/modules/core';
import { DASHBOARD_HISTORY_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import slice from './history-child-activities/redux';

const Empty = () => null;

const ChildrenTablePage = lazy(() => import('./history-children-table'));
const ChildActivitiesPage = lazy(() => import('./history-child-activities'));

const HistoryPage = () => (
  <Suspense fallback={<Empty />}>
    <Routes>
      <Route
        path={DASHBOARD_HISTORY_PATH.CHILDREN}
        element={<ChildrenTablePage />}
      />
      <Route
        path={DASHBOARD_HISTORY_PATH.LOG}
        element={<ChildActivitiesPage />}
      />
      <Route
        path="*"
        element={<Navigate to={DASHBOARD_HISTORY_PATH.CHILDREN} />}
      />
    </Routes>
  </Suspense>
);

export default () => (
  <Module slice={slice}>
    <HistoryPage />
  </Module>
);
