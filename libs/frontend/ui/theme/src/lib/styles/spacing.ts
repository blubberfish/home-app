import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import {
  EdgeSide,
  EdgeType,
  MarginProps,
  PaddingProps,
  PositionProps,
  Theme,
  ThemeCssValue,
} from '../types';
import { num2Px, resolve } from '../utils';

const cssProperty = (side: EdgeSide, type?: EdgeType) => {
  let prop: string = side;
  if (type) {
    prop = `${type}-${prop}`;
  }
  return prop;
};

const cssEdge = (value: ThemeCssValue, side: EdgeSide, type?: EdgeType) =>
  css`
    ${cssProperty(side, type)}: ${typeof value === 'number'
      ? num2Px(value)
      : value};
  `;

export const margin = <
  P extends ThemedStyledProps<MarginProps, Theme> = ThemedStyledProps<
    MarginProps,
    Theme
  >
>({
  m,
  mb,
  ml,
  mr,
  mt,
  mx,
  my,
  theme,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  const left = ml || mx || m;
  left &&
    styles.push(
      cssEdge(resolve(left, theme.spacings), EdgeSide.left, EdgeType.margin)
    );

  const right = mr || mx || m;
  right &&
    styles.push(
      cssEdge(resolve(right, theme.spacings), EdgeSide.right, EdgeType.margin)
    );

  const top = mt || my || m;
  top &&
    styles.push(
      cssEdge(resolve(top, theme.spacings), EdgeSide.top, EdgeType.margin)
    );

  const bottom = mb || my || m;
  bottom &&
    styles.push(
      cssEdge(resolve(bottom, theme.spacings), EdgeSide.bottom, EdgeType.margin)
    );

  return styles;
};

export const padding = <
  P extends ThemedStyledProps<PaddingProps, Theme> = ThemedStyledProps<
    PaddingProps,
    Theme
  >
>({
  p,
  pb,
  pl,
  pr,
  pt,
  px,
  py,
  theme,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  const left = pl || px || p;
  left &&
    styles.push(
      cssEdge(resolve(left, theme.spacings), EdgeSide.left, EdgeType.pad)
    );

  const right = pr || px || p;
  right &&
    styles.push(
      cssEdge(resolve(right, theme.spacings), EdgeSide.right, EdgeType.pad)
    );

  const top = pt || py || p;
  top &&
    styles.push(
      cssEdge(resolve(top, theme.spacings), EdgeSide.top, EdgeType.pad)
    );

  const bottom = pb || py || p;
  bottom &&
    styles.push(
      cssEdge(resolve(bottom, theme.spacings), EdgeSide.bottom, EdgeType.pad)
    );

  return styles;
};

export const position = <
  P extends ThemedStyledProps<PositionProps, Theme> = ThemedStyledProps<
    PositionProps,
    Theme
  >
>({
  position,
  b,
  l,
  r,
  t,
  x,
  y,
  theme,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  position &&
    styles.push(
      css`
        position: ${position};
      `
    );

  const left = l || x;
  left && styles.push(cssEdge(resolve(left, theme.spacings), EdgeSide.left));

  const right = r || x;
  right && styles.push(cssEdge(resolve(right, theme.spacings), EdgeSide.right));

  const top = t || y;
  top && styles.push(cssEdge(resolve(top, theme.spacings), EdgeSide.top));

  const bottom = b || y;
  bottom &&
    styles.push(cssEdge(resolve(bottom, theme.spacings), EdgeSide.bottom));

  return styles;
};
