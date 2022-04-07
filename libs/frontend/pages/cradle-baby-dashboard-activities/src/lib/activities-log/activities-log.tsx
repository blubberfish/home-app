import { Module } from '@blubberfish/frontend/modules/core';
import { DASHBOARD_ACTIVITIES_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { grid, GridProps } from '@blubberfish/style-system';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { LogActions } from './activities-log-actions';
import { LogHeader } from './activities-log-header';
import { useChild } from './hooks';
import slice from './redux';

const Container = styled.div<GridProps>`
  ${grid}
`;

const LogPage = () => {
  const child = useChild();
  if (!child)
    return <Navigate to={`../${DASHBOARD_ACTIVITIES_PATH.CHILDREN}`} />;
  return (
    <Container
      autoFlow="row"
      autoRows='min-content'
      templateColumns='1fr'
      gap={3}
    >
      <LogHeader />
      <LogActions />
    </Container>
  );
};

export default () => (
  <Module slice={slice}>
    <LogPage />
  </Module>
);
