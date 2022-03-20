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
} from '@blubberfish/frontend/ui/theme';

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
  box-sizing: border-box;
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
