import {
  RightFromBracket,
  Baby,
  PeopleRoof,
  Timeline,
} from '@blubberfish/frontend/components/icons/font-awesome';
import {
  accountInfoSelector,
  exitThunk,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  alignment,
  AlignmentProps,
  color,
  ColorProps,
  display,
  DisplayProps,
  font,
  FontProps,
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
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { NavButton, NavLink } from './button';
import { PATH } from '../routes';

const restrainingProps: SizeProps = {
  w: '100%',
  wMax: '1024px',
};

const Container = styled.div<
  AlignmentProps &
    ColorProps &
    MarginProps &
    PaddingProps &
    SizeProps &
    GridProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${margin}
  ${padding}
  ${size}
`;

const Title = styled.h1<FontProps>`
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${font}
`;

const responsiveNavBar = responsive<DisplayProps>(display);
const Nav = styled.nav<
  GridProps & GridPositionProps & ResponsiveProps<DisplayProps>
>`
  ${grid}
  ${gridPos}
  ${responsiveNavBar}
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
  const info = useSelector(accountInfoSelector);
  const handleExit = useCallback(() => {
    dispatch(exitThunk());
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
      <Container
        marX="auto"
        padX={3}
        padY={2}
        templateRows="min-content"
        templateColumns="1fr max-content"
        {...restrainingProps}
      >
        <Title ftSize={3}>
          {info?.displayName ? `${info?.displayName}'s` : 'My'} family
        </Title>
      </Container>
      {info && (
        <Container
          marX="auto"
          gap={3}
          padT={2}
          padX={3}
          templateRows="1fr"
          templateColumns="max-content 1fr"
          {...restrainingProps}
        >
          <Nav
            gap={1}
            gridCol={1}
            gridRow={1}
            autoFlow="row"
            autoRows="min-content"
            templateColumns="1fr"
            responsive={[{ disp: 'none' }, { disp: 'grid' }]}
          >
            <NavLink icon={<PeopleRoof />} label="Overview" to={PATH.FAMILY} />
            <NavLink icon={<Baby />} label="Activities" to={PATH.ACTIVITIES} />
            <NavLink icon={<Timeline />} label="History" to={PATH.HISTORY} />
            <NavButton
              icon={<RightFromBracket />}
              label="Log out"
              onClick={handleExit}
            />
          </Nav>
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
      )}
    </Container>
  );
};
