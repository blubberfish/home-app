import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type PositionProps = {
  pos?: 'absolute' | 'relative' | 'sticky';
  posX?: number | string;
  posY?: number | string;
  posL?: number | string;
  posR?: number | string;
  posT?: number | string;
  posB?: number | string;
};

export const position = <Props extends PositionProps>({
  theme,
  pos,
  posB,
  posL,
  posR,
  posT,
  posX,
  posY,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [
    css`
      position: ${pos || 'relative'};
    `,
  ];
  const position = (theme as Theme).spacing ?? defaultTheme.spacing;

  const l = posL || posX;
  l &&
    styles.push(
      css`
        left: ${resolve(l, position)};
      `
    );

  const r = posR || posX;
  r &&
    styles.push(
      css`
        right: ${resolve(r, position)};
      `
    );

  const t = posT || posY;
  t &&
    styles.push(
      css`
        top: ${resolve(t, position)};
      `
    );

  const b = posB || posY;
  b &&
    styles.push(
      css`
        bottom: ${resolve(b, position)};
      `
    );

  return styles;
};
