import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { accountInfoSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  ConstrainedLayout,
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
    width: 2em;
    height: 2em;
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
    gap={3}
  >
    {left ?? <Container h="2em" w="2em" bg="#fff3" rad="50%" />}
    {right ?? <Container h="1em" w="8em" bg="#fff3" />}
  </ContainerWithIcon>
);

export const DashboardHead = () => {
  const info = useSelector(accountInfoSelector);
  return (
    <Container
      bg="background"
      fg="text"
      overflow="auto"
      templateColumns="1fr"
      autoFlow="row"
      autoRows="min-content"
      pad={3}
    >
      <ConstrainedLayout>
        <Skeleton
          left={info && <FontAwesome.PeopleRoof />}
          right={info && <span>{info?.displayName}'s family</span>}
        />
      </ConstrainedLayout>
    </Container>
  );
};
