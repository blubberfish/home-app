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
import styled from 'styled-components';

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

export const DashboardActivitiesGridTitle = () => {
  return (
    <Grid gap={1} templateRows="repeat(3, max-content)" pos="relative">
      Last 3 day's activities
    </Grid>
  );
};
