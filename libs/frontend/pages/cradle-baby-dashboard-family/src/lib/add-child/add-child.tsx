import { Module } from '@blubberfish/frontend/modules/core';
import slice from './redux';

const AddChildPage = () => null;

export default () => (
  <Module slice={slice}>
    <AddChildPage />
  </Module>
);
