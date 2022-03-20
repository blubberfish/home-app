import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import {
  EdgeSide,
  BorderStyleProps,
  BorderProps,
  RadiusProps,
  Theme,
} from '../types';
import { num2Px, resolve } from '../utils';

const borderCss = (side: EdgeSide, style: BorderStyleProps, theme: Theme) =>
  css`border-${side}: ${
    typeof style.size === 'number' ? num2Px(style.size) : style.size ?? '0px'
  } ${style.style ?? 'solid'} ${
    style.color ? resolve(style.color, theme.colors) : 'currentColor'
  };`;

export const radius = <
  P extends ThemedStyledProps<RadiusProps, Theme> = ThemedStyledProps<
    RadiusProps,
    Theme
  >
>({
  radius: rad,
  theme,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  const { all, b, t, l, r, tr, tl, br, bl } = rad ?? {};

  const tleft = tl || t || l || all;
  tleft &&
    styles.push(
      css`
        border-top-left-radius: ${num2Px(resolve(tleft, theme.radii))};
      `
    );

  const tright = tr || t || r || all;
  tright &&
    styles.push(
      css`
        border-top-right-radius: ${num2Px(resolve(tright, theme.radii))};
      `
    );

  const bleft = bl || b || l || all;
  bleft &&
    styles.push(
      css`
        border-bottom-left-radius: ${num2Px(resolve(bleft, theme.radii))};
      `
    );

  const bright = br || b || r || all;
  bright &&
    styles.push(
      css`
        border-bottom-right-radius: ${num2Px(resolve(bright, theme.radii))};
      `
    );

  return styles;
};

export const border = <
  P extends ThemedStyledProps<BorderProps, Theme> = ThemedStyledProps<
    BorderProps,
    Theme
  >
>({
  border: bdr,
  theme,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  const { all, b, t, l, r, x, y } = bdr ?? {};

  if (l || x || all) {
    const left = {
      ...all,
      ...x,
      ...l,
    };
    left && styles.push(borderCss(EdgeSide.left, left, theme));
  }

  if (r || x || all) {
    const right = {
      ...all,
      ...x,
      ...r,
    };
    right && styles.push(borderCss(EdgeSide.right, right, theme));
  }

  if (b || y || all) {
    const bottom = {
      ...all,
      ...y,
      ...b,
    };
    bottom && styles.push(borderCss(EdgeSide.bottom, bottom, theme));
  }

  if (t || y || all) {
    const top = {
      ...all,
      ...y,
      ...b,
    };
    top && styles.push(borderCss(EdgeSide.top, top, theme));
  }

  return styles;
};
