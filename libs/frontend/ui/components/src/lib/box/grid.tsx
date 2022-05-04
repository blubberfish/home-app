import styled from 'styled-components';
import { Box } from './base';
import { grid, GridProps } from '@blubberfish/frontend/ui/theme';

export const Grid = styled(Box) <GridProps>`
  display: grid;
  ${grid}
`;
