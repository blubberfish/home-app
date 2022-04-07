import { activityColorsSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  color,
  ColorProps,
  grid,
  GridProps,
  radius,
  RadiusProps,
  responsive,
  ResponsiveProps,
} from '@blubberfish/style-system';
import { BabyActivityType } from '@blubberfish/types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

type ResponsiveCellProps = GridProps;
const responsiveCell = responsive<ResponsiveCellProps>(grid);
const Container = styled.div<
  ColorProps & GridProps & RadiusProps & ResponsiveProps<ResponsiveCellProps>
>`
  overflow: hidden;
  ${color}
  ${grid}
  ${radius}
  ${responsiveCell}
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
      bg="background_weak"
      rad={1}
      responsive={[
        {
          templateColumns: '1fr',
          autoFlow: 'row',
          autoRows: '1fr',
        },
        {
          templateRows: '1fr',
          autoFlow: 'column',
          autoColumns: '1fr',
        },
      ]}
    >
      {activities.map((activity, i) => (
        <Shading key={i} bg={colors[activity]} />
      ))}
    </Container>
  );
};
