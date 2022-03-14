import {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { resolve } from '../resolve';
import { IndicationProps, Theme } from '../../../../types';

export const indication = <
  P extends ThemedStyledProps<IndicationProps, Theme> = ThemedStyledProps<
    IndicationProps,
    Theme
  >
>({
  opacity,
  theme,
}: P) => {
  const styles: FlattenSimpleInterpolation[] = [];

  if (opacity) {
    (opacity.disabled === 0 || opacity.disabled) &&
      styles.push(
        css`
          &:disabled {
            opacity: ${resolve(opacity.disabled, theme.opacityIndications)};
          }
        `
      );

    (opacity.hover === 0 || opacity.hover) &&
      styles.push(
        css`
          &:hover {
            opacity: ${resolve(opacity.hover, theme.opacityIndications)};
          }
        `
      );
  }

  return styles;
};
