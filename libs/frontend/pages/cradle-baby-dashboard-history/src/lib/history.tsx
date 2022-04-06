import { Module } from '@blubberfish/frontend/modules/core';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import slice from './redux';

const Empty = () => null;

const ChildrenTablePage = lazy(() => import('./history-children-table'));
const ChildHistoryPage = lazy(() => import('./history-child-history'));

const HistoryPage = () => (
  <Suspense fallback={<Empty />}>
    <Routes>
      <Route path=":uuid" element={<ChildHistoryPage />} />
      <Route index element={<ChildrenTablePage />} />
    </Routes>
  </Suspense>
);

export default () => (
  <Module slice={slice}>
    <HistoryPage />
  </Module>
);
