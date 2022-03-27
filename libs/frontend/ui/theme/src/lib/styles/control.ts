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

  if (indication?.disabled) {
    styles.push(
      css`
        &:disabled {
          opacity: ${resolve(
            indication.disabled.opacity ?? '1',
            theme.opacities
          )};
        }
      `
    );
  }

  if (indication?.focus) {
    styles.push(
      css`
        &:focus {
          opacity: ${resolve(indication.focus.opacity ?? '1', theme.opacities)};
        }
      `
    );
  }

  if (indication?.hover) {
    styles.push(
      css`
        &:hover {
          opacity: ${resolve(indication.hover.opacity ?? '1', theme.opacities)};
        }
      `
    );
  }

  return styles;
};
