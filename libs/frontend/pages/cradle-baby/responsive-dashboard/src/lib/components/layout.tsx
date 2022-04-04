import { Box, Grid, ContrainedBox } from '@blubberfish/frontend/components/box';
import { Bars } from '@blubberfish/frontend/components/icons/font-awesome';
import {
  alignment,
  AlignmentProps,
  grid,
  GridProps,
  gridPos,
  GridPositionProps,
} from '@blubberfish/style-system';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled(Grid)`
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
`;

const ContrainedGrid = styled(ContrainedBox)<
  AlignmentProps & GridProps & GridPositionProps
>`
  ${alignment}
  ${grid}
  ${gridPos}
`;

export type DashboardLayout = {
  nav: [];
};

export const DashboardLayout = (props: DashboardLayout) => (
  <Container
    h="100vh"
    w="100%"
    autoFlow="row"
    autoRows="1fr"
    templateRows="min-content"
    templateColumns="1fr"
  >
    <header>
      <ContrainedGrid
        padX={3}
        padY={2}
        justifyContent="space-between"
        templateColumns="1fr max-content"
        templateRows="min-content"
      >
        <Box></Box>
        <button>
          <Bars />
        </button>
      </ContrainedGrid>
    </header>
    <nav></nav>
    <main>
      <Outlet />
    </main>
  </Container>
);
