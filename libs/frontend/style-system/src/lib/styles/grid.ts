import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { DisplayProps, display } from './display';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type GridProps = DisplayProps & {
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
  disp,
  gapX,
  gapY,
  gap,
  templateColumns,
  templateRows,
  autoColumns,
  autoFlow,
  autoRows,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = disp
    ? []
    : display({ disp: 'grid', theme });
  const spacing = (theme as Theme)?.spacing || defaultTheme.spacing;

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

  return styles;
};

export type GridPositionProps = {
  gridCol?: number;
  gridColSpan?: number;
  gridRow?: number;
  gridRowSpan?: number;
};

export const gridPos = <Props extends GridPositionProps>({
  theme,
  gridCol,
  gridColSpan,
  gridRow,
  gridRowSpan,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [
    css`
      display: grid;
    `,
  ];

  if (gridCol) {
    styles.push(
      css`
        grid-column: ${gridCol} / span ${gridColSpan || 1};
      `
    );
  }

  if (gridRow) {
    styles.push(
      css`
        grid-row: ${gridRow} / span ${gridRowSpan || 1};
      `
    );
  }

  return styles;
};
