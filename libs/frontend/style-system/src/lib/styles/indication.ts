import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StyleSystemFunction = (props: any) => FlattenSimpleInterpolation[];

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
