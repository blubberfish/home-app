import { Module } from '@blubberfish/frontend/modules/core';
import slice from './redux';
import { AddChildForm } from './add-child-form';

const AddChildPage = () => (
  <div>
    <AddChildForm />
  </div>
);

export default () => (
  <Module slice={slice}>
    <AddChildPage />
  </Module>
);
