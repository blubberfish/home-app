import { Box, Grid, ContrainedBox } from '@blubberfish/frontend/components/box';
import { Bars } from '@blubberfish/frontend/components/icons/font-awesome';
import {
  color,
  ColorProps,
  grid,
  GridProps,
  gridPos,
  GridPositionProps,
  responsive,
  ResponsiveProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const responsiveGridLayout = responsive<GridProps>((props) => [grid(props)]);

const Container = styled.div<
  ColorProps & SizeProps & ResponsiveProps<GridProps>
>`
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
  ${color}
  ${size}
  ${responsiveGridLayout}
`;

const responsiveNavBar = responsive<GridPositionProps>(gridPos);
const Nav = styled.nav<ResponsiveProps<GridPositionProps>>`
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
  ${color}
  ${size}
  ${responsiveNavBar}
`;

export type DashboardLayout = {
  nav: [];
};

export const DashboardLayout = (props: DashboardLayout) => (
  <Container
    h="100vh"
    w="100%"
    responsive={[
      {
        templateRows: 'min-content 1fr',
        templateColumns: '1fr',
      },
      {
        templateColumns: 'max-content 1fr',
      },
    ]}
  ></Container>
);
