import styled from 'styled-components';
import { border, color, grid, ColorProps, GridProps } from 'styled-system';
import { commonStyles, CommonStyledSystemProps } from './utils';

export const Box = styled.div<CommonStyledSystemProps & ColorProps>(
  {
    boxSizing: 'border-box',
  },
  commonStyles,
  border,
  color
);

export const Grid = styled(Box)<GridProps>({ display: 'grid' }, grid);
