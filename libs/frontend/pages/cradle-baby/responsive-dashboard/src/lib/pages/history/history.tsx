import { Module } from '@blubberfish/frontend/modules/core';
import { Routes, Route } from 'react-router-dom';
import slice from './redux';
import { ChildrenTable } from './history-children-table';

const Empty = () => null;

const HistoryPage = () => (
  <Routes>
    <Route path=":id" element={<Empty />} />
    <Route index element={<ChildrenTable />} />
  </Routes>
);

export default () => (
  <Module slice={slice}>
    <HistoryPage />
  </Module>
);
