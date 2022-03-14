import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { resolve } from '../resolve';
import { GridProps, Theme } from '../../../../types';

export const grid = <
  P extends ThemedStyledProps<GridProps, Theme> = ThemedStyledProps<
    GridProps,
    Theme
  >
>({
  grid: g,
  theme,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  const { gap, autoColumns, autoRows, templateColumns, templateRows } = g ?? {};

  if (gap) {
    switch (typeof gap) {
      case 'number':
      case 'string':
        styles.push(
          css`
            column-gap: ${resolve(gap, theme.spacings)};
            row-gap: ${resolve(gap, theme.spacings)};
          `
        );
        break;
      default: {
        gap.x &&
          styles.push(
            css`
              column-gap: ${resolve(gap.x, theme.spacings)};
            `
          );
        gap.y &&
          styles.push(
            css`
              row-gap: ${resolve(gap.y, theme.spacings)};
            `
          );
        break;
      }
    }
  }

  autoColumns &&
    styles.push(
      css`
        grid-auto-columns: ${Array.isArray(autoColumns)
          ? autoColumns.join(' ')
          : autoColumns};
      `
    );

  autoRows &&
    styles.push(
      css`
        grid-auto-rows: ${Array.isArray(autoRows)
          ? autoRows.join(' ')
          : autoRows};
      `
    );

  templateColumns &&
    styles.push(
      css`
        grid-template-columns: ${Array.isArray(templateColumns)
          ? templateColumns.join(' ')
          : templateColumns};
      `
    );

  templateRows &&
    styles.push(
      css`
        grid-template-rows: ${Array.isArray(templateRows)
          ? templateRows.join(' ')
          : templateRows};
      `
    );

  return styles;
};
