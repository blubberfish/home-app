import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';

// eslint-disable-next-line @typescript-eslint/ban-types
type StyleSystemFunction<Props extends {} = {}> = (
  props: StyledProps<Props>
) => FlattenSimpleInterpolation[] | null | undefined;

export enum IndicationType {
  Disabled = 'disabled',
  Focus = 'focus',
  Hover = 'hover',
  Placeholder = 'placeholder',
}

export const indication =
  <Props>(type: IndicationType, styles: StyleSystemFunction<Props>[]) =>
  (props: StyledProps<Props>) =>
    css`
      ${'&:' + type} {
        ${styles.reduce(
          (seed: FlattenSimpleInterpolation[], style) => [
            ...seed,
            ...(style(props) ?? []),
          ],
          []
        )}
      }
    `;
