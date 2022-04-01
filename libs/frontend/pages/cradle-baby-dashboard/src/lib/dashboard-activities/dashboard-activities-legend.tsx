import {
  alignment,
  AlignmentProps,
  color,
  ColorProps,
  grid,
  GridProps,
  position,
  PositionProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { BabyActivityType } from '@blubberfish/types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { colorsSelector } from './redux';
import { getInitialState } from './redux/base';

const Grid = styled.div<
  AlignmentProps &
    ColorProps &
    GridProps &
    PositionProps &
    RadiusProps &
    SizeProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${position}
  ${radius}
  ${size}
`;

export const Legend = ({
  label,
  type,
}: {
  label: string;
  type: BabyActivityType;
}) => {
  const colors = useSelector(colorsSelector);
  const color = useMemo(
    () => (colors ?? getInitialState().colors)[type],
    [colors, type]
  );
  return (
    <Grid
      templateColumns="max-content 1fr"
      templateRows="min-content"
      alignItems="center"
      gap={3}
    >
      <Grid bg={color} h="8px" w="8px" rad="50%" />
      <span>{label}</span>
    </Grid>
  );
};

export const DashboardActivitiesLegend = () => {
  return (
    <Grid gap={1}>
      <Legend type="baby:activity:feed" label="Feeding" />
      <Legend type="baby:activity:nurse" label="Nursing" />
      <Legend type="baby:activity:sleep" label="Sleeping" />
    </Grid>
  );
};
