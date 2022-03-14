import styled from 'styled-components';
import { background, color, margin, padding, position } from './theme/helpers';
import {
  BackgroundColorProps,
  ColorProps,
  MarginProps,
  PaddingProps,
  PositionProps,
} from '../types';

export const Box = styled.div<
  BackgroundColorProps & ColorProps & MarginProps & PaddingProps & PositionProps
>`
  box-spacing: border-box;
  position: relative;
  ${background}
  ${color}
  ${margin}
  ${padding}
  ${position}
`;
