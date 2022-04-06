import {
  color,
  ColorProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import styled from 'styled-components';
import { OverviewAdultsList } from './overview-adults-list';
import { OverviewChildrenList } from './overview-children-list';

const Container = styled.div<
  ColorProps & GridProps & PaddingProps & RadiusProps & SizeProps
>`
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${size}
`;

export const Overview = () => {
  return (
    <Container
      templateColumns="1fr"
      autoRows="min-content"
      autoFlow="row"
      gap={3}
    >
      <OverviewAdultsList />
      <OverviewChildrenList />
    </Container>
  );
};
