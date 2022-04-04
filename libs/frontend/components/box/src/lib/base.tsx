import styled from 'styled-components';
import {
  color,
  margin,
  padding,
  position,
  size,
  BorderProps,
  ColorProps,
  MarginProps,
  PaddingProps,
  PositionProps,
  RadiusProps,
  SizeProps,
} from '@blubberfish/style-system';

export type BoxStyleProps = BorderProps &
  ColorProps &
  MarginProps &
  PaddingProps &
  PositionProps &
  RadiusProps &
  SizeProps;

export const Box = styled.div<BoxStyleProps>`
  box-sizing: border-box;
  ${color}
  ${margin}
  ${padding}
  ${position}
  ${size}
`;
