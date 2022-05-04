import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { num2Px, resolve } from '../utils';
import { GridProps, Theme } from '../types';

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

  const {
    alignContent,
    alignItems,
    justifyContent,
    justifyItems,
    gap,
    autoColumns,
    autoFlow,
    autoRows,
    templateColumns,
    templateRows,
  } = g ?? {};

  if (gap) {
    switch (typeof gap) {
      case 'number':
      case 'string':
        styles.push(
          css`
            column-gap: ${num2Px(resolve(gap, theme.spacings))};
            row-gap: ${num2Px(resolve(gap, theme.spacings))};
          `
        );
        break;
      default: {
        gap.x &&
          styles.push(
            css`
              column-gap: ${num2Px(resolve(gap.x, theme.spacings))};
            `
          );
        gap.y &&
          styles.push(
            css`
              row-gap: ${num2Px(resolve(gap.y, theme.spacings))};
            `
          );
        break;
      }
    }
  }

  alignContent &&
    styles.push(
      css`
        align-content: ${alignContent};
      `
    );

  alignItems &&
    styles.push(
      css`
        align-items: ${alignItems};
      `
    );

  justifyContent &&
    styles.push(
      css`
        justify-content: ${justifyContent};
      `
    );

  justifyItems &&
    styles.push(
      css`
        justify-items: ${justifyItems};
      `
    );

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

  autoFlow &&
    styles.push(
      css`
        grid-auto-flow: ${autoFlow};
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
