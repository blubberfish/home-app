import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { resolve } from '../utils';
import { BackgroundColorProps, ColorProps, Theme } from '../types';

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

    bgImg.attachment &&
      styles.push(css`
        background-attachment: ${bgImg.attachment};
      `);

    bgImg.position &&
      styles.push(css`
        background-position: ${bgImg.position};
      `);

    bgImg.repeat &&
      styles.push(css`
        background-repeat: ${bgImg.repeat};
      `);

    bgImg.size &&
      styles.push(css`
        background-size: ${bgImg.size};
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
