import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { num2Px, resolve } from '../utils';
import { SizeProps, Theme } from '../types';

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
        height: ${num2Px(resolve(h, theme.sizes))};
      `
    );

  (maxH || maxH === 0) &&
    styles.push(
      css`
        max-height: ${num2Px(resolve(maxH, theme.sizes))};
      `
    );

  (minH || minH === 0) &&
    styles.push(
      css`
        min-height: ${num2Px(resolve(minH, theme.sizes))};
      `
    );

  (w || w === 0) &&
    styles.push(
      css`
        width: ${num2Px(resolve(w, theme.sizes))};
      `
    );

  (maxW || maxW === 0) &&
    styles.push(
      css`
        max-width: ${num2Px(resolve(maxW, theme.sizes))};
      `
    );

  (minW || minW === 0) &&
    styles.push(
      css`
        min-width: ${num2Px(resolve(minW, theme.sizes))};
      `
    );

  return styles;
};
