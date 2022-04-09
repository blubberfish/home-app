import { Module } from '@blubberfish/frontend/modules/core';
import {
  grid,
  GridProps,
  padding,
  PaddingProps,
} from '@blubberfish/style-system';
import styled from 'styled-components';
import slice from './redux';
import { AddChildAlert } from './add-child-alert';
import { AddChildForm } from './add-child-form';

const Container = styled.div<GridProps & PaddingProps>`
  ${grid}
  ${padding}
`;

const AddChildPage = () => (
  <Container
    templateColumns="1fr"
    autoRows="min-content"
    autoFlow="row"
    gap={3}
  >
    <AddChildAlert />
    <AddChildForm />
  </Container>
);

export default () => (
  <Module slice={slice}>
    <AddChildPage />
  </Module>
);
