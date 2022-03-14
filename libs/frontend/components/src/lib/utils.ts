import {
  compose,
  alignSelf,
  gridColumn,
  gridRow,
  height,
  maxHeight,
  minHeight,
  width,
  maxWidth,
  minWidth,
  justifySelf,
  position,
  space,
  AlignSelfProps,
  GridColumnProps,
  GridRowProps,
  HeightProps,
  MaxHeightProps,
  MinHeightProps,
  WidthProps,
  MaxWidthProps,
  MinWidthProps,
  JustifySelfProps,
  PositionProps,
  SpaceProps,
} from 'styled-system';

export const commonStyles = compose(
  alignSelf,
  gridColumn,
  gridRow,
  height,
  maxHeight,
  minHeight,
  width,
  maxWidth,
  minWidth,
  justifySelf,
  position,
  space
);

export type CommonStyledSystemProps = AlignSelfProps &
  JustifySelfProps &
  GridColumnProps &
  GridRowProps &
  PositionProps &
  HeightProps &
  MaxHeightProps &
  MinHeightProps &
  WidthProps &
  MaxWidthProps &
  MinWidthProps &
  SpaceProps;
