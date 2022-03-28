import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve, asCssValue } from '../utils';

export type RadiusProps = {
  rad?: number | string;
  radL?: number | string;
  radR?: number | string;
  radT?: number | string;
  radB?: number | string;
  radTL?: number | string;
  radTR?: number | string;
  radBL?: number | string;
  radBR?: number | string;
};

export const radius = <Props extends RadiusProps>({
  theme,
  rad,
  radL,
  radR,
  radT,
  radB,
  radTL,
  radTR,
  radBL,
  radBR,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  const radii = (theme as Theme)?.radii ?? defaultTheme.radii;

  const rtl = radTL || radL || radT || rad;
  (rtl || rtl === 0) &&
    styles.push(
      css`
        border-top-left-radius: ${resolve(rtl, radii)};
      `
    );
  const rtr = radTR || radR || radT || rad;
  (rtr || rtr === 0) &&
    styles.push(
      css`
        border-top-right-radius: ${resolve(rtr, radii)};
      `
    );
  const rbl = radBL || radL || radB || rad;
  (rbl || rbl === 0) &&
    styles.push(
      css`
        border-bottom-left-radius: ${resolve(rbl, radii)};
      `
    );
  const rbr = radBR || radR || radB || rad;
  (rbr || rbr === 0) &&
    styles.push(
      css`
        border-bottom-right-radius: ${resolve(rbr, radii)};
      `
    );

  return styles;
};

export type BorderStyle = {
  size?: number | string;
  color?: number | string;
};

export type BorderProps = {
  bdr?: BorderStyle;
  bdrX?: BorderStyle;
  bdrY?: BorderStyle;
  bdrL?: BorderStyle;
  bdrR?: BorderStyle;
  bdrT?: BorderStyle;
  bdrB?: BorderStyle;
};

export const border = <Props extends BorderProps>({
  theme,
  bdr,
  bdrX,
  bdrY,
  bdrL,
  bdrR,
  bdrT,
  bdrB,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  const colors = (theme as Theme)?.colors ?? defaultTheme.colors;

  const l = bdrL || bdrX || bdr ? { ...bdr, ...bdrX, ...bdrL } : null;
  if (l) {
    styles.push(
      css`
        border-left-style: solid;
      `
    );
    if (l.color) {
      styles.push(
        css`
          border-left-color: ${resolve(l.color, colors)};
        `
      );
    }
    if (l.size || l.size === 0) {
      styles.push(
        css`
          border-left-width: ${asCssValue(l.size)};
        `
      );
    }
  }

  const r = bdrR || bdrX || bdr ? { ...bdr, ...bdrX, ...bdrR } : null;
  if (r) {
    styles.push(
      css`
        border-right-style: solid;
      `
    );
    if (r.color) {
      styles.push(
        css`
          border-right-color: ${resolve(r.color, colors)};
        `
      );
    }
    if (r.size || r.size === 0) {
      styles.push(
        css`
          border-right-width: ${asCssValue(r.size)};
        `
      );
    }
  }

  const t = bdrT || bdrY || bdr ? { ...bdr, ...bdrY, ...bdrT } : null;
  if (t) {
    styles.push(
      css`
        border-top-style: solid;
      `
    );
    if (t.color) {
      styles.push(
        css`
          border-top-color: ${resolve(t.color, colors)};
        `
      );
    }
    if (t.size || t.size === 0) {
      styles.push(
        css`
          border-top-width: ${asCssValue(t.size)};
        `
      );
    }
  }

  const b = bdrB || bdrY || bdr ? { ...bdr, ...bdrY, ...bdrB } : null;
  if (b) {
    styles.push(
      css`
        border-bottom-style: solid;
      `
    );
    if (b.color) {
      styles.push(
        css`
          border-bottom-color: ${resolve(b.color, colors)};
        `
      );
    }
    if (b.size || b.size === 0) {
      styles.push(
        css`
          border-bottom-width: ${asCssValue(b.size)};
        `
      );
    }
  }

  return styles;
};
