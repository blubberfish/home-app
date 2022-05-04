import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { LayoutProps, Theme } from '../types';

export const layout = <
  P extends ThemedStyledProps<LayoutProps, Theme> = ThemedStyledProps<
    LayoutProps,
    Theme
  >
>({
  alignSelf,
  column,
  justifySelf,
  row,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  alignSelf &&
    styles.push(
      css`
        align-self: ${alignSelf};
      `
    );

  column &&
    styles.push(
      css`
        grid-column: ${column.span
          ? `${column.index} / span ${column.span}`
          : column.index};
      `
    );

  justifySelf &&
    styles.push(
      css`
        justify-self: ${justifySelf};
      `
    );

  row &&
    styles.push(
      css`
        grid-row: ${row.span ? `${row.index} / span ${row.span}` : row.index};
      `
    );

  return styles;
};
