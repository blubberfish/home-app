import { Suspense } from 'react'
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import {
  alignment,
  AlignmentProps,
  border,
  BorderProps,
  color,
  ColorProps,
  grid,
  GridProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';

import { DashboardHead } from './dashboard-head';
import { DashboardMenu } from './dashboard-menu';

const Container = styled.div<
  AlignmentProps &
  BorderProps &
  ColorProps &
  GridProps &
  MarginProps &
  PaddingProps &
  SizeProps
  >`
  ${alignment}
  ${border}
  ${color}
  ${grid}
  ${margin}
  ${padding}
  ${size}
`;

const Empty = () => null

export const DashboardPageLayout = () => {
  return (
    <Container
      bg="background"
      fg="text"
      w="100%"
      h="100vh"
      overflow="auto"
      templateColumns="1fr"
      templateRows="1fr min-content"
      autoFlow="row"
      autoRows="min-content"
      gap={3}
    >
      <Container templateColumns="1fr" autoRows="min-content" gap={3}>
        <DashboardHead />
        <Suspense fallback={<Empty />}>
          <Outlet />
        </Suspense>
      </Container>
      <DashboardMenu />
    </Container>
  );
};
