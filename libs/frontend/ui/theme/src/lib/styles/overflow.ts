import { css, ThemedStyledProps } from 'styled-components';
import { OverflowProps, Theme } from '../types';

export const overflow = <
  P extends ThemedStyledProps<OverflowProps, Theme> = ThemedStyledProps<
    OverflowProps,
    Theme
  >
>({
  overflow: o,
  theme,
}: P) => {
  return css`
    overflow: ${o ?? 'auto'};
  `;
};
