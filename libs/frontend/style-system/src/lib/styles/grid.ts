import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type GridProps = {
  gap?: number | string;
  gapX?: number | string;
  gapY?: number | string;
  templateColumns?: string | string[];
  templateRows?: string | string[];
  autoColumns?: string | string[];
  autoRows?: string | string[];
  autoFlow?: string;
};

export const grid = <Props extends GridProps>({
  theme,
  gapX,
  gapY,
  gap,
  templateColumns,
  templateRows,
  autoColumns,
  autoFlow,
  autoRows,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [
    css`
      display: grid;
    `,
  ];
  const spacing = (theme as Theme).spacing || defaultTheme.spacing;

  const gX = gapX || gap;
  gX &&
    styles.push(
      css`
        column-gap: ${resolve(gX, spacing)};
      `
    );

  const gY = gapY || gap;
  gY &&
    styles.push(
      css`
        row-gap: ${resolve(gY, spacing)};
      `
    );

  templateColumns &&
    styles.push(
      css`
        template-columns: ${Array.isArray(templateColumns)
          ? templateColumns.join(' ')
          : templateColumns};
      `
    );

  templateRows &&
    styles.push(
      css`
        template-rows: ${Array.isArray(templateRows)
          ? templateRows.join(' ')
          : templateRows};
      `
    );

  autoColumns &&
    styles.push(
      css`
        auto-columns: ${Array.isArray(autoColumns)
          ? autoColumns.join(' ')
          : autoColumns};
      `
    );

  autoRows &&
    styles.push(
      css`
        auto-rows: ${Array.isArray(autoRows) ? autoRows.join(' ') : autoRows};
      `
    );

  autoFlow &&
    styles.push(
      css`
        auto-flow: ${autoFlow};
      `
    );

  return styles;
};
