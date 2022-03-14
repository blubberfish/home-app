import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { resolve } from '../resolve';
import { BackgroundColorProps, ColorProps, Theme } from '../../../../types';

export const background = <
  P extends ThemedStyledProps<BackgroundColorProps, Theme> = ThemedStyledProps<
    BackgroundColorProps,
    Theme
  >
>({
  bg,
  bgImg,
  theme,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  bg &&
    styles.push(css`
      background: ${resolve(bg, theme.colors)};
    `);

  if (bgImg) {
    styles.push(css`
      background-image: url('${resolve(bgImg.url, theme.images)}');
    `);
  }

  return styles;
};

export const color = <
  P extends ThemedStyledProps<ColorProps, Theme> = ThemedStyledProps<
    ColorProps,
    Theme
  >
>({
  fg,
  theme,
}: P) => {
  return fg
    ? css`
        color: ${resolve(fg, theme.colors)};
      `
    : null;
};
