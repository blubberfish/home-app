import styled from 'styled-components';
import {
  background,
  border,
  color,
  layout,
  margin,
  padding,
  position,
  radius,
} from '../theme/helpers';
import {
  BackgroundColorProps,
  BorderProps,
  ColorProps,
  LayoutProps,
  MarginProps,
  PaddingProps,
  PositionProps,
  RadiusProps,
} from '../../types';

export const Box = styled.div<
  BackgroundColorProps &
    BorderProps &
    ColorProps &
    LayoutProps &
    MarginProps &
    PaddingProps &
    PositionProps &
    RadiusProps
>`
  box-spacing: border-box;
  ${background}
  ${border}
  ${color}
  ${layout}
  ${margin}
  ${padding}
  ${position}
  ${radius}
`;
