import { ThemeCssValue } from './theme';

export enum EdgeType {
  margin = 'margin',
  pad = 'padding',
}

export enum EdgeSide {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

export type MarginProps = {
  m?: ThemeCssValue;
  mx?: ThemeCssValue;
  my?: ThemeCssValue;
  ml?: ThemeCssValue;
  mr?: ThemeCssValue;
  mt?: ThemeCssValue;
  mb?: ThemeCssValue;
};

export type PaddingProps = {
  p?: ThemeCssValue;
  px?: ThemeCssValue;
  py?: ThemeCssValue;
  pl?: ThemeCssValue;
  pr?: ThemeCssValue;
  pt?: ThemeCssValue;
  pb?: ThemeCssValue;
};

export type PositionProps = {
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  x?: ThemeCssValue;
  y?: ThemeCssValue;
  l?: ThemeCssValue;
  r?: ThemeCssValue;
  t?: ThemeCssValue;
  b?: ThemeCssValue;
};
