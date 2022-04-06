import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { Button, FontAwesome } from '@blubberfish/frontend/ui/components';
import { PATH as BASE_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
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
  position,
  PositionProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { PATH } from './dashboard-paths';

const slideIn = keyframes`
from {
  opacity: 0;
  transform: translateY(100%);
}
to {
  opacity: 1;
  transform: translateY(0%);
}`;

const Container = styled.div<
  AlignmentProps &
  BorderProps &
  ColorProps &
  GridProps &
  MarginProps &
  PaddingProps &
  PositionProps &
  RadiusProps &
  SizeProps
  >`
  ${alignment}
  ${border}
  ${color}
  ${grid}
  ${margin}
  ${padding}
  ${position}
  ${radius}
  ${size}
`;

const SlideInContainer = styled(Container) <{ hide?: boolean }>`
  animation-name: ${slideIn};
  animation-duration: 0.34s;
  animation-timing-function: ease-out;

  ${({ hide }) =>
    hide &&
    css`
      display: none;
    `}
`;

export const DashboardMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const handleNav = useMemo(
    () => ({
      toActivities: () => {
        setShowMenu(false);
        navigate(`/${BASE_PATH.DASHBOARD}/${PATH.ACTIVITIES}`);
      },
      toBaby: () => {
        setShowMenu(false);
        navigate(`/${BASE_PATH.DASHBOARD}/${PATH.BABY}`);
      },
      toFamily: () => {
        setShowMenu(false);
        navigate(`/${BASE_PATH.DASHBOARD}/${PATH.FAMILY}`);
      },
    }),
    [navigate]
  );
  return (
    <Container
      templateColumns="max-content"
      templateRows="max-content"
      justifyContent="center"
      pos="fixed"
      posB={5}
      posR={5}
    >
      <Button
        fg="text_invert"
        ftSize={3}
        onClick={() => {
          setShowMenu(true);
        }}
        simple
      >
        <Container
          alignContent="center"
          justifyContent="center"
          bg="background_invert"
          pad={2}
          rad="50%"
        >
          <FontAwesome.Bars />
        </Container>
      </Button>
      <SlideInContainer
        bg="background_weak"
        hide={!showMenu}
        pad={3}
        pos="fixed"
        posB={3}
        posL={3}
        posR={3}
        rad={3}
        templateColumns="repeat(4, max-content)"
        autoRows="max-content"
        autoFlow="dense"
        gap={1}
        justifyContent="space-evenly"
        justifyItems="center"
      >
        <Button ftSize={4} simple onClick={handleNav.toFamily}>
          <FontAwesome.PeopleRoof />
        </Button>
        <Button ftSize={4} simple onClick={handleNav.toBaby}>
          <FontAwesome.Baby />
        </Button>
        <Button ftSize={4} simple onClick={handleNav.toActivities}>
          <FontAwesome.Timeline />
        </Button>
        <Button
          fg="error"
          ftSize={3}
          simple
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <FontAwesome.X />
        </Button>
      </SlideInContainer>
    </Container>
  );
};
