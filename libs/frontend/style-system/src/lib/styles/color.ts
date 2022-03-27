import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type ColorProps = {
  fg?: string;
  bg?: string;
};

export const color = <Props extends ColorProps>({
  theme,
  bg,
  fg,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  const colors = (theme as Theme).colors ?? defaultTheme.colors;
  bg &&
    styles.push(
      css`
        background-color: ${resolve(bg, colors)};
      `
    );
  fg &&
    styles.push(
      css`
        color: ${resolve(fg, colors)};
      `
    );
  return styles;
};
