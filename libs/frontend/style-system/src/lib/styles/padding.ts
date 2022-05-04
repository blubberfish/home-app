import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type PaddingProps = {
  pad?: number | string;
  padX?: number | string;
  padY?: number | string;
  padL?: number | string;
  padR?: number | string;
  padT?: number | string;
  padB?: number | string;
};

export const padding = <Props extends PaddingProps>({
  theme,
  pad,
  padB,
  padL,
  padR,
  padT,
  padX,
  padY,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  const padding = (theme as Theme)?.spacing ?? defaultTheme.spacing;

  const l = padL || padX || pad;
  (l || l === 0) &&
    styles.push(
      css`
        padding-left: ${resolve(l, padding)};
      `
    );

  const r = padR || padX || pad;
  (r || r === 0) &&
    styles.push(
      css`
        padding-right: ${resolve(r, padding)};
      `
    );

  const t = padT || padY || pad;
  (t || t === 0) &&
    styles.push(
      css`
        padding-top: ${resolve(t, padding)};
      `
    );

  const b = padB || padY || pad;
  (b || b === 0) &&
    styles.push(
      css`
        padding-bottom: ${resolve(b, padding)};
      `
    );

  return styles;
};
