/* eslint-disable @typescript-eslint/ban-types */
import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type ResponsiveProps<Props extends {}> = {
  responsive?: Props[];
};

export const responsive =
  <Props extends {}>(
    generator: (props: StyledProps<Props>) => FlattenSimpleInterpolation[]
  ) =>
  ({ responsive, theme }: StyledProps<ResponsiveProps<Props>>) => {
    const styles: FlattenSimpleInterpolation[] = [];
    const breakpoints =
      (theme as Theme).breakpoints || defaultTheme.breakpoints;
    responsive?.forEach((style, i) => {
      if (i > 0) {
        styles.push(
          css`
            @media only screen and (min-width: ${resolve(i, breakpoints)}) {
              ${generator({ ...style, theme })}
            }
          `
        );
      } else {
        styles.push(
          css`
            ${generator({ ...style, theme })}
          `
        );
      }
    });
    return styles;
  };
