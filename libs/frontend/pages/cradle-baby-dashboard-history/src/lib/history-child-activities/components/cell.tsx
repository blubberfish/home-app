import { activityColorsSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  color,
  ColorProps,
  grid,
  GridProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { BabyActivityType } from '@blubberfish/types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div<ColorProps & GridProps & RadiusProps>`
  ${color}
  ${grid}
  ${radius}
`;

const Shading = styled.section<ColorProps>`
  ${color}
`;

export type CellProps = {
  activities?: BabyActivityType[];
};
export const Cell = ({ activities = [] }: CellProps) => {
  const colors = useSelector(activityColorsSelector);
  return (
    <Container
      templateColumns="1fr"
      autoFlow="row"
      autoRows="1fr"
      bg="background_weak"
      rad={1}
    >
      {activities.map((activity, i) => (
        <Shading key={i} bg={colors[activity]} />
      ))}
    </Container>
  );
};
