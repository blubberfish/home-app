import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  compose,
  border,
  BorderProps,
  color,
  ColorProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  alignContent,
  AlignContentProps,
  alignItems,
  AlignItemsProps,
  alignSelf,
  AlignSelfProps,
  justifyContent,
  JustifyContentProps,
  justifyItems,
  JustifyItemsProps,
  justifySelf,
  JustifySelfProps,
  position,
  PositionProps,
} from 'styled-system';

type BoxStyleSystemProps = AlignContentProps &
  AlignItemsProps &
  AlignSelfProps &
  JustifyContentProps &
  JustifyItemsProps &
  JustifySelfProps &
  BorderProps &
  ColorProps &
  GridProps &
  LayoutProps &
  PositionProps &
  SpaceProps;

export type BoxProps = BoxStyleSystemProps & HTMLAttributes<HTMLDivElement>;

const boxStyle = compose(
  alignContent,
  alignItems,
  alignSelf,
  border,
  color,
  grid,
  justifyContent,
  justifyItems,
  justifySelf,
  layout,
  position,
  space
);

export const Box = styled.div<BoxStyleSystemProps>(boxStyle);
