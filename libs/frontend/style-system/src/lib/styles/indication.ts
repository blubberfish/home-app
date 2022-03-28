import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';

type StyleSystemFunction = (props: unknown) => FlattenSimpleInterpolation[];

export enum IndicationType {
  Disabled = 'disabled',
  Focus = 'focus',
  Hover = 'hover',
}

export const indication =
  <Props>(type: IndicationType, styles: StyleSystemFunction[]) =>
  (props: StyledProps<Props>) =>
    css`
      ${'&:' + type} {
        ${styles.reduce(
          (seed: FlattenSimpleInterpolation[], style) => [
            ...seed,
            ...style(props),
          ],
          []
        )}
      }
    `;
