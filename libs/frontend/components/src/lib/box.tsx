import styled from 'styled-components';
import {
  alignContent,
  alignItems,
  alignSelf,
  justifyContent,
  justifyItems,
  justifySelf,
  border,
  color,
  grid,
  layout,
  position,
  space,
  AlignContentProps,
  AlignItemsProps,
  AlignSelfProps,
  JustifyContentProps,
  JustifyItemsProps,
  JustifySelfProps,
  BorderProps,
  ColorProps,
  GridProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from 'styled-system';

export const Box = styled.div<
  AlignSelfProps &
  JustifySelfProps &
  BorderProps &
  ColorProps &
  LayoutProps &
  PositionProps &
  SpaceProps
>(
  {
    boxSizing: 'border-box',
  },
  alignSelf,
  justifySelf,
  border,
  color,
  layout,
  position,
  space
);

export const Grid = styled(Box)<
  GridProps &
  AlignContentProps &
  AlignItemsProps &
  JustifyContentProps &
  JustifyItemsProps
>({ display: 'grid' },
  alignContent,
  alignItems,
  justifyContent,
  justifyItems,
  grid
);
