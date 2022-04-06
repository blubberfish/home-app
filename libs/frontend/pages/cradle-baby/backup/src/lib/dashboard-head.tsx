import { ReactNode, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  accountInfoSelector,
  exitThunk,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  Button,
  ContrainedBox,
  FontAwesome,
} from '@blubberfish/frontend/ui/components';
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
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';

const Container = styled.div<
  AlignmentProps &
    BorderProps &
    ColorProps &
    GridProps &
    MarginProps &
    PaddingProps &
    RadiusProps &
    SizeProps
>`
  ${alignment}
  ${border}
  ${color}
  ${grid}
  ${margin}
  ${padding}
  ${radius}
  ${size}
`;

const ContainerWithIcon = styled(Container)`
  svg {
    width: 1.2em;
    height: 1.2em;
    fill: currentColor;
  }
`;

type SkeletonProps = {
  left?: ReactNode;
  right?: ReactNode;
};
const Skeleton = ({ left, right }: SkeletonProps) => (
  <ContainerWithIcon
    templateColumns="max-content 1fr"
    templateRows="1fr"
    alignItems="center"
    gap={2}
  >
    {left ?? <Container h="2em" w="2em" bg="#fff3" rad="50%" />}
    {right ?? <Container h="1em" w="8em" bg="#fff3" />}
  </ContainerWithIcon>
);

export const DashboardHead = () => {
  const dispatch = useDispatch();
  const info = useSelector(accountInfoSelector);
  const handleExit = useCallback(() => {
    dispatch(exitThunk());
  }, [dispatch]);

  return (
    <Container
      bg="background"
      fg="text"
      templateColumns="1fr"
      templateRows="1fr"
      pad={3}
    >
      <ContrainedBox>
        <Container
          alignContent="center"
          alignItems="center"
          templateColumns="1fr max-content"
          templateRows="1fr"
          gap={3}
        >
          <Skeleton
            left={info && <FontAwesome.PeopleRoof />}
            right={info && <span>{info?.displayName}'s family</span>}
          />
          <Button simple onClick={handleExit}>
            <FontAwesome.RightFromBracket />
          </Button>
        </Container>
      </ContrainedBox>
    </Container>
  );
};
