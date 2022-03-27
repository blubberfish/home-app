import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type FontSizeProps = {
  ftSize?: number | string;
  ftWeight?: number | string;
};

export const font = <Props extends FontSizeProps>({
  theme,
  ftSize,
  ftWeight,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  const fontSizes = (theme as Theme).fontSizes ?? defaultTheme.fontSizes;
  const fontWeights = (theme as Theme).fontWeights ?? defaultTheme.fontWeights;
  ftSize &&
    styles.push(
      css`
        font-size: ${resolve(ftSize, fontSizes)};
      `
    );
  ftWeight &&
    styles.push(
      css`
        font-weight: ${resolve(ftWeight, fontWeights)};
      `
    );
  return styles;
};

export type FontStyleProps = {
  wrap?: boolean;
  truncate?: boolean;
};

export const fontStyle = <Props extends FontStyleProps>({
  wrap,
  truncate,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  typeof wrap === 'boolean' &&
    styles.push(css`
      white-space: ${wrap ? 'wrap' : 'nowrap'};
    `);
  truncate &&
    styles.push(css`
      text-overflow: ellipsis;
    `);
  return styles;
};
