import { css, ThemedStyledProps } from 'styled-components';
import { resolve } from '../resolve';
import { BackgroundColorProps, ColorProps, Theme } from '../../../../types';

export const background = <
  P extends ThemedStyledProps<BackgroundColorProps, Theme> = ThemedStyledProps<
    BackgroundColorProps,
    Theme
  >
>({
  bg,
  theme,
}: P) => {
  console.trace(bg);
  return bg
    ? css`
        background: ${resolve(bg, theme.colors)};
      `
    : null;
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
