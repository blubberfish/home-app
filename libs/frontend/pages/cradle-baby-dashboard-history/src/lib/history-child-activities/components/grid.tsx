import {
  grid,
  GridProps,
  radius,
  RadiusProps,
  responsive,
  ResponsiveProps,
} from '@blubberfish/style-system';
import { ReactNode } from 'react';
import styled from 'styled-components';

type ResponsiveCellGridProps = GridProps;
const responsiveGrid = responsive<ResponsiveCellGridProps>(grid);

const Container = styled.div<
  GridProps & ResponsiveProps<ResponsiveCellGridProps> & RadiusProps
>`
  ${grid}
  ${responsiveGrid}
  ${radius}
`;

export type CellGridProps = {
  children?: ReactNode;
};

export const CellGrid = ({ children }: CellGridProps) => {
  return (
    <Container
      gap={1}
      rad={1}
      responsive={[
        {
          templateColumns: 'repeat(3, 16px)',
          templateRows: 'repeat(24, 16px)',
          autoFlow: 'column dense',
        },
        {
          templateColumns: 'repeat(24, 24px)',
          templateRows: 'repeat(3, 24px)',
          autoFlow: 'row dense',
        },
      ]}
    >
      {children}
    </Container>
  );
};
