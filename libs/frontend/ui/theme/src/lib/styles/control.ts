import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { resolve } from '../utils';
import { IndicationProps, Theme } from '../types';

export const indication = <
  P extends ThemedStyledProps<IndicationProps, Theme> = ThemedStyledProps<
    IndicationProps,
    Theme
  >
>({
  indication,
  theme,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  if (indication?.opacity) {
    (indication.opacity.disabled === 0 || indication.opacity.disabled) &&
      styles.push(
        css`
          &:disabled {
            opacity: ${resolve(
              indication.opacity.disabled,
              theme.opacityIndications
            )};
          }
        `
      );

    (indication.opacity.hover === 0 || indication.opacity.hover) &&
      styles.push(
        css`
          &:hover {
            opacity: ${resolve(
              indication.opacity.hover,
              theme.opacityIndications
            )};
          }
        `
      );
  }

  return styles;
};
