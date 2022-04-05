import { Module } from '@blubberfish/frontend/modules/core';
import slice from './redux';
import { ChildrenTable } from './history-children-table';

const HistoryPage = () => <ChildrenTable />;

export default () => (
  <Module slice={slice}>
    <HistoryPage />
  </Module>
);
