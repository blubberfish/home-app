import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type MarginProps = {
  mar?: number | string;
  marX?: number | string;
  marY?: number | string;
  marL?: number | string;
  marR?: number | string;
  marT?: number | string;
  marB?: number | string;
};

export const margin = <Props extends MarginProps>({
  theme,
  mar,
  marB,
  marL,
  marR,
  marT,
  marX,
  marY,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  const marginTheme = (theme as Theme)?.spacing ?? defaultTheme.spacing;

  const l = marL || marX || mar;
  (l || l === 0) &&
    styles.push(
      css`
        margin-left: ${resolve(l, marginTheme)};
      `
    );

  const r = marR || marX || mar;
  (r || r === 0) &&
    styles.push(
      css`
        margin-right: ${resolve(r, marginTheme)};
      `
    );

  const t = marT || marY || mar;
  (t || t === 0) &&
    styles.push(
      css`
        margin-top: ${resolve(t, marginTheme)};
      `
    );

  const b = marB || marY || mar;
  (b || b === 0) &&
    styles.push(
      css`
        margin-bottom: ${resolve(b, marginTheme)};
      `
    );

  return styles;
};
