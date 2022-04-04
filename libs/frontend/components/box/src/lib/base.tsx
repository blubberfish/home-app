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

export const Box = styled.div<
  BorderProps &
    ColorProps &
    MarginProps &
    PaddingProps &
    PositionProps &
    RadiusProps &
    SizeProps
>`
  box-sizing: border-box;
  ${color}
  ${margin}
  ${padding}
  ${position}
  ${size}
`;
