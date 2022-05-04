import { X } from '@blubberfish/frontend/components/icons/font-awesome';
import {
  alignment,
  AlignmentProps,
  color,
  ColorProps,
  display,
  DisplayProps,
  grid,
  GridProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  position,
  PositionProps,
  responsive,
  ResponsiveProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from '../button';
import { closeMenu, isMenuOpenSelector, navListSelector } from '../../redux';
import { useNavigate } from 'react-router-dom';

const responsiveContainer = responsive<DisplayProps>(display);

const Container = styled.div<
  AlignmentProps &
  ColorProps &
  GridProps &
  MarginProps &
  PaddingProps &
  PositionProps &
  ResponsiveProps<DisplayProps> &
  SizeProps
  >`
  ${alignment}
  ${color}
  ${grid}
  ${margin}
  ${padding}
  ${position}
  ${responsiveContainer}
  ${size}
`;

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
`;

export const DashboardLayoutMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(isMenuOpenSelector);
  const items = useSelector(navListSelector);
  const handleCloseMenu = useCallback(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  if (!isMenuOpen) return null;
  return (
    <Container
      bg="background_strong"
      fg="text"
      h="100vh"
      w="100%"
      pad={3}
      pos="fixed"
      posX={0}
      posB={0}
      autoFlow="row"
      autoRows="min-content"
      templateColumns="1fr"
      responsive={[{ disp: 'grid' }, { disp: 'none' }]}
    >
      <Container pad={3} justifyItems="end">
        <MenuButton
          responsive={[{ disp: 'initial' }, { disp: 'none' }]}
          onClick={handleCloseMenu}
        >
          <X />
        </MenuButton>
      </Container>
      {items.map((item, i) => (
        <NavLink
          key={i}
          icon={<item.icon />}
          label={item.label}
          onClick={() => {
            handleCloseMenu();
            navigate(item.path);
          }}
          to={item.path}
        />
      ))}
    </Container>
  );
};
