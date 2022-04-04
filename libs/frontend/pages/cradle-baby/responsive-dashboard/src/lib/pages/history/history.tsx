import { Module } from '@blubberfish/frontend/modules/core';
import slice from './redux';

const HistoryPage = () => null;

export default () => (
  <Module slice={slice}>
    <HistoryPage />
  </Module>
);
