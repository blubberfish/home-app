import { Module } from '@blubberfish/frontend/modules/core';
import { grid, GridProps } from '@blubberfish/style-system';
import styled from 'styled-components';
import slice from './redux';

const Container = styled.div<GridProps>`
  ${grid}
`;

const DashboardActivitiesPage = () => <Container gap={3}></Container>;

export default () => (
  <Module slice={slice}>
    <DashboardActivitiesPage />
  </Module>
);
