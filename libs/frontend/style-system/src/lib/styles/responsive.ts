/* eslint-disable @typescript-eslint/ban-types */
import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';

export type ResponsiveProps<Props extends StyledProps<{}>> = {
  [mediaQuery: string]: (props: Props) => FlattenSimpleInterpolation[];
};

export const responsive =
  <Props extends StyledProps<{}>>(setup: ResponsiveProps<Props>) =>
  (props: Props) => {
    const styles: FlattenSimpleInterpolation[] = [];
    Object.entries(setup).forEach(([mediaQuery, fn]) => {
      styles.push(css`
        ${mediaQuery} {
          ${fn(props)}
        }
      `);
    });
    return styles;
  };
