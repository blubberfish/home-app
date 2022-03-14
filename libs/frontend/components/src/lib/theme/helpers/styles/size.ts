import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { resolve } from '../resolve';
import { SizeProps, Theme } from '../../../../types';

export const size = <
  P extends ThemedStyledProps<SizeProps, Theme> = ThemedStyledProps<
    SizeProps,
    Theme
  >
>({
  theme,
  h,
  maxH,
  maxW,
  minH,
  minW,
  w,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  (h || h === 0) &&
    styles.push(
      css`
        height: ${resolve(h, theme.sizes)};
      `
    );

  (maxH || maxH === 0) &&
    styles.push(
      css`
        max-height: ${resolve(maxH, theme.sizes)};
      `
    );

  (minH || minH === 0) &&
    styles.push(
      css`
        min-height: ${resolve(minH, theme.sizes)};
      `
    );

  (w || w === 0) &&
    styles.push(
      css`
        width: ${resolve(w, theme.sizes)};
      `
    );

  (maxW || maxW === 0) &&
    styles.push(
      css`
        max-width: ${resolve(maxW, theme.sizes)};
      `
    );

  (minW || minW === 0) &&
    styles.push(
      css`
        min-width: ${resolve(minW, theme.sizes)};
      `
    );

  return styles;
};
