import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type PositionProps = {
  pos?: 'absolute' | 'fixed' | 'relative' | 'sticky';
  posX?: number | string;
  posY?: number | string;
  posL?: number | string;
  posR?: number | string;
  posT?: number | string;
  posB?: number | string;
  z?: number | string;
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
  z,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [
    css`
      position: ${pos || 'relative'};
    `,
  ];
  const position = (theme as Theme)?.spacing ?? defaultTheme.spacing;
  const layers = (theme as Theme)?.layers ?? defaultTheme.layers;

  const l = posL || posX;
  (l || l === 0) &&
    styles.push(
      css`
        left: ${resolve(l, position)};
      `
    );

  const r = posR || posX;
  (r || r === 0) &&
    styles.push(
      css`
        right: ${resolve(r, position)};
      `
    );

  const t = posT || posY;
  (t || t === 0) &&
    styles.push(
      css`
        top: ${resolve(t, position)};
      `
    );

  const b = posB || posY;
  (b || b === 0) &&
    styles.push(
      css`
        bottom: ${resolve(b, position)};
      `
    );

  (z || z === 0) &&
    styles.push(
      css`
        z-index: ${resolve(z, layers)};
      `
    );

  return styles;
};
