import styled from 'styled-components';
import {
  background,
  border,
  color,
  layout,
  margin,
  overflow,
  padding,
  position,
  radius,
  size,
} from '../theme/helpers';
import {
  BackgroundColorProps,
  BorderProps,
  ColorProps,
  LayoutProps,
  MarginProps,
  OverflowProps,
  PaddingProps,
  PositionProps,
  RadiusProps,
  SizeProps,
} from '../../types';

export const Box = styled.div<
  BackgroundColorProps &
    BorderProps &
    ColorProps &
    LayoutProps &
    MarginProps &
    OverflowProps &
    PaddingProps &
    PositionProps &
    RadiusProps &
    SizeProps
>`
  box-spacing: border-box;
  display: block;
  ${background}
  ${border}
  ${color}
  ${layout}
  ${margin}
  ${overflow}
  ${padding}
  ${position}
  ${radius}
  ${size}
`;
