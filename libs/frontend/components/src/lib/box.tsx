import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import {
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
} from 'styled-system';

type BoxStyleSystemProps = AlignContentProps &
  AlignItemsProps &
  AlignSelfProps &
  JustifyContentProps &
  JustifyItemsProps &
  JustifySelfProps &
  ColorProps &
  GridProps &
  LayoutProps &
  SpaceProps;

export type BoxProps = BoxStyleSystemProps & HTMLAttributes<HTMLDivElement>;

export const Box = styled.div<BoxStyleSystemProps>(
  alignContent,
  alignItems,
  alignSelf,
  justifyContent,
  justifyItems,
  justifySelf,
  color,
  grid,
  layout,
  space
);
