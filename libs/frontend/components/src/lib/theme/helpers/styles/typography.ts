import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { num2Px } from '../css';
import { resolve } from '../resolve';
import {
  FontFamilyProps,
  FontSizeProps,
  FontStyleProps,
  TypographyProps,
  Theme,
} from '../../../../types';

export const fontFamily = <
  P extends ThemedStyledProps<FontFamilyProps, Theme> = ThemedStyledProps<
    FontFamilyProps,
    Theme
  >
>({
  theme,
  font,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  font &&
    styles.push(
      css`
        font-family: ${resolve(font, theme.fontFamilies)};
      `
    );

  return styles;
};

export const fontSize = <
  P extends ThemedStyledProps<FontSizeProps, Theme> = ThemedStyledProps<
    FontSizeProps,
    Theme
  >
>({
  theme,
  size,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  size &&
    styles.push(
      css`
        font-family: ${num2Px(resolve(size, theme.fontSizes))};
      `
    );

  return styles;
};

export const fontStyle = <
  P extends ThemedStyledProps<FontStyleProps, Theme> = ThemedStyledProps<
    FontStyleProps,
    Theme
  >
>({
  theme,
  truncate,
  weight,
  wrap,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [
    css`
      white-space: ${wrap ? 'wrap' : 'nowrap'};
    `,
  ];

  truncate &&
    styles.push(
      css`
        text-overflow: ellipsis;
      `
    );

  weight &&
    styles.push(
      css`
        font-weight: ${resolve(weight, theme.fontWeights)};
      `
    );

  return styles;
};

export const typography = <
  P extends ThemedStyledProps<TypographyProps, Theme> = ThemedStyledProps<
    TypographyProps,
    Theme
  >
>(
  props: P
) => [...fontFamily(props), ...fontSize(props), ...fontStyle(props)];
