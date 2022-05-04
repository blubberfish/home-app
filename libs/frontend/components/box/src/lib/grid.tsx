import styled from 'styled-components';
import { Box } from './base';
import {
  alignment,
  AlignmentProps,
  grid,
  GridProps,
} from '@blubberfish/style-system';

export const Grid = styled(Box)<AlignmentProps & GridProps>`
  ${alignment}
  ${grid}
`;
