import styled from 'styled-components';
import { Box } from './base';
import { grid } from '../theme/helpers';
import { GridProps } from '../../types';

export const Grid = styled(Box)<GridProps>`
  display: grid;
  ${grid}
`;
