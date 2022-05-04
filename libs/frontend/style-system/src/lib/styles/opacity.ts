import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type OpacityProps = {
  opacity?: number | string;
};

export const opacity = <Props extends OpacityProps>({
  theme,
  opacity,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  const opacities = (theme as Theme)?.opacities ?? defaultTheme.opacities;
  opacity &&
    styles.push(
      css`
        opacity: ${resolve(opacity, opacities)};
      `
    );
  return styles;
};
