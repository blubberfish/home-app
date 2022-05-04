import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type SvgProps = {
  fill?: string;
  stroke?: string;
};

export const svg = <Props extends SvgProps>({
  theme,
  fill,
  stroke,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  const colors = (theme as Theme)?.colors ?? defaultTheme.colors;
  fill &&
    styles.push(
      css`
        fill: ${resolve(fill, colors)};
      `
    );
  stroke &&
    styles.push(
      css`
        stroke: ${resolve(stroke, colors)};
      `
    );
  return styles;
};
