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
import { colorsSelector } from '../redux';

type ResponsiveCellGridProps = GridProps;
const responsiveGrid = responsive<ResponsiveCellGridProps>(grid);

const Container = styled.div<
  ResponsiveProps<ResponsiveCellGridProps> & RadiusProps
>`
  ${responsiveGrid}
  ${radius}
`;

export type CellGridProps = {};

export const CellGrid = ({}: CellGridProps) => {
  return <Container rad={1}></Container>;
};
