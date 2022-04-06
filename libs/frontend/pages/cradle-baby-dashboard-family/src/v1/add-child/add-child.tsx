import styled from 'styled-components';
import {
  grid,
  GridProps,
  padding,
  PaddingProps,
} from '@blubberfish/style-system';
import { Module } from '@blubberfish/frontend/modules/core';
import { ContrainedBox as ConstrainedLayout } from '@blubberfish/frontend/ui/components';
import slice from './redux';
import { AddChildAlert } from './add-child-alert';
import { AddChildForm } from './add-child-form';
import { AddChildSuccess } from './add-child-success';

const ConstrainedContainer = styled(ConstrainedLayout)<
  GridProps & PaddingProps
>`
  ${grid}
  ${padding}
`;

const AddChildPage = () => (
  <ConstrainedContainer
    gap={3}
    pad={3}
    templateColumns="1fr"
    autoRows="min-content"
    autoFlow="row"
  >
    <AddChildAlert />
    <AddChildSuccess />
    <AddChildForm />
  </ConstrainedContainer>
);

export default () => (
  <Module slice={slice}>
    <AddChildPage />
  </Module>
);
