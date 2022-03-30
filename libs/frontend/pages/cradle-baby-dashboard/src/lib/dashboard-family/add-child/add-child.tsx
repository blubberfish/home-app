import { Module } from '@blubberfish/frontend/modules/core';
import slice from './redux';
import { AddChildForm } from './add-child-form';

export default () => (
  <Module slice={slice}>
    <AddChildForm />
  </Module>
);
