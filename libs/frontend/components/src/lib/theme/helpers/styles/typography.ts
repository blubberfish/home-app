import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { resolve } from '../resolve';
import { TypographyProps, Theme } from '../../../../types';

export const typography = <
  P extends ThemedStyledProps<TypographyProps, Theme> = ThemedStyledProps<
    TypographyProps,
    Theme
  >
>({
  theme,
  family,
  size,
  truncate,
  weight,
  wrap,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [
    css`
      white-space: ${wrap ? 'wrap' : 'nowrap'};
    `,
  ];

  family &&
    styles.push(
      css`
        font-family: ${family};
      `
    );

  size &&
    styles.push(
      css`
        font-family: ${resolve(size, theme.fontSizes)};
      `
    );

  truncate &&
    styles.push(
      css`
        text-overflow: ellipsis;
      `
    );

  weight &&
    styles.push(
      css`
        font-weight: ${weight};
      `
    );

  return styles;
};
