/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type SizeProps = {
  w?: number | string;
  wMax?: number | string;
  wMin?: number | string;
  h?: number | string;
  hMax?: number | string;
  hMin?: number | string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringOrNumber = (value: any) =>
  typeof value === 'number' || typeof value === 'string';

export const size = <Props extends SizeProps>({
  theme,
  w,
  wMax,
  wMin,
  h,
  hMax,
  hMin,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  const widths = (theme as Theme).widths ?? defaultTheme.widths;
  const heights = (theme as Theme).heights ?? defaultTheme.heights;

  isStringOrNumber(w) &&
    styles.push(
      css`
        width: ${resolve(w!, widths)};
      `
    );
  isStringOrNumber(wMin) &&
    styles.push(
      css`
        min-width: ${resolve(wMin!, widths)};
      `
    );
  isStringOrNumber(wMax) &&
    styles.push(
      css`
        max-width: ${resolve(wMax!, widths)};
      `
    );

  isStringOrNumber(h) &&
    styles.push(
      css`
        height: ${resolve(w!, heights)};
      `
    );
  isStringOrNumber(hMin) &&
    styles.push(
      css`
        min-height: ${resolve(hMin!, heights)};
      `
    );
  isStringOrNumber(hMax) &&
    styles.push(
      css`
        max-height: ${resolve(hMax!, heights)};
      `
    );

  return styles;
};
