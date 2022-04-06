import { RightFromBracket } from '@blubberfish/frontend/components/icons/font-awesome';
import { exitThunk } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  display,
  DisplayProps,
  grid,
  GridProps,
  gridPos,
  GridPositionProps,
  responsive,
  ResponsiveProps,
} from '@blubberfish/style-system';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavButton, NavLink } from '../button';
import { navListSelector } from '../../redux';

const responsiveNavBar = responsive<DisplayProps>(display);
const Nav = styled.nav<
  GridProps & GridPositionProps & ResponsiveProps<DisplayProps>
>`
  ${grid}
  ${gridPos}
  ${responsiveNavBar}
`;

export const DashboardLayoutNav = () => {
  const dispatch = useDispatch();
  const items = useSelector(navListSelector);
  const handleExit = useCallback(() => {
    dispatch(exitThunk());
  }, [dispatch]);
  console.log(items);
  return (
    <Nav
      gap={1}
      gridCol={1}
      gridRow={1}
      autoFlow="row"
      autoRows="min-content"
      templateColumns="1fr"
      responsive={[{ disp: 'none' }, { disp: 'grid' }]}
    >
      {items.map((item, i) => (
        <NavLink
          key={i}
          icon={<item.icon />}
          label={item.label}
          to={item.path}
        />
      ))}
      <NavButton
        icon={<RightFromBracket />}
        label="Log out"
        onClick={handleExit}
      />
    </Nav>
  );
};
