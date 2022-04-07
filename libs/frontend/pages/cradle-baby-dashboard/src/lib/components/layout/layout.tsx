import { Bars } from '@blubberfish/frontend/components/icons/font-awesome';
import {
  alignment,
  AlignmentProps,
  color,
  ColorProps,
  display,
  DisplayProps,
  grid,
  GridProps,
  gridPos,
  GridPositionProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  responsive,
  ResponsiveProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { Suspense, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { DashboardLayoutMenu } from './layout-menu';
import { DashboardLayoutNav } from './layout-nav';
import { DashboardLayoutTitle } from './layout-title';
import { openMenu } from '../../redux';

const restrainingProps: SizeProps = {
  w: '100%',
  wMax: '1024px',
};

const responsiveGridLayout = responsive<GridProps>(grid);

const Container = styled.div<
  AlignmentProps &
    ColorProps &
    MarginProps &
    PaddingProps &
    SizeProps &
    GridProps &
    ResponsiveProps<GridProps>
>`
  ${alignment}
  ${color}
  ${grid}
  ${margin}
  ${padding}
  ${size}
  ${responsiveGridLayout}
`;

const responsiveMenuButton = responsive<DisplayProps>(display);
const MenuButton = styled.button<ResponsiveProps<DisplayProps>>`
  border: 0;
  border-radius: 0;
  background: transparent;
  color: currentColor;
  margin: 0;
  outline: 0;
  padding: 0;
  svg {
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: middle;
  }
  ${responsiveMenuButton}
`;

const Main = styled.main<GridProps & GridPositionProps>`
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
  ${grid}
  ${gridPos}
`;

const Empty = () => null;

export const DashboardLayout = () => {
  const dispatch = useDispatch();
  const handleClickMenu = useCallback(() => {
    dispatch(openMenu());
  }, [dispatch]);
  return (
    <Container
      bg="background"
      fg="text"
      h="100vh"
      w="100%"
      templateRows="min-content 1fr"
      templateColumns="1fr"
    >
      <Container bg="background_weak">
        <Container
          marX="auto"
          pad={3}
          padY={2}
          alignContent="center"
          templateRows="min-content"
          templateColumns="1fr max-content"
          {...restrainingProps}
        >
          <DashboardLayoutTitle />
          <MenuButton
            responsive={[{ disp: 'initial' }, { disp: 'none' }]}
            onClick={handleClickMenu}
          >
            <Bars />
          </MenuButton>
        </Container>
      </Container>
      <Container
        marX="auto"
        padT={3}
        padX={3}
        templateRows="1fr"
        templateColumns="max-content 1fr"
        responsive={[{ gap: 0 }, { gap: 3 }]}
        {...restrainingProps}
      >
        <DashboardLayoutNav />
        <Main
          gridCol={2}
          gridRow={1}
          autoFlow="row"
          autoRows="1fr"
          templateColumns="1fr"
        >
          <Suspense fallback={<Empty />}>
            <Outlet />
          </Suspense>
        </Main>
      </Container>
      <DashboardLayoutMenu />
    </Container>
  );
};
