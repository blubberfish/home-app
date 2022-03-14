import styled from 'styled-components';
import {
  background,
  border,
  color,
  margin,
  padding,
  position,
  radius,
} from '../theme/helpers';
import {
  BackgroundColorProps,
  BorderProps,
  ColorProps,
  MarginProps,
  PaddingProps,
  PositionProps,
  RadiusProps,
} from '../../types';

export const Box = styled.div<
  BackgroundColorProps &
    BorderProps &
    ColorProps &
    MarginProps &
    PaddingProps &
    PositionProps &
    RadiusProps
>`
  box-spacing: border-box;
  ${background}
  ${border}
  ${color}
  ${margin}
  ${padding}
  ${position}
  ${radius}
`;
