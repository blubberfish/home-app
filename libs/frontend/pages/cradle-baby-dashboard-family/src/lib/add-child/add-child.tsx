import { Module } from '@blubberfish/frontend/modules/core';
import slice from './redux';
import Page from './v1'

const AddChildPage = () => <Page />;

export default () => (
  <Module slice={slice}>
    <AddChildPage />
  </Module>
);
