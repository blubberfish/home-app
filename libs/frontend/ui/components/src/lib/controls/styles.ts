import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import {
  BorderProps,
  border,
  ColorProps,
  color,
  FontProps,
  font,
  OpacityProps,
  opacity,
} from '@blubberfish/style-system';

export type IndicationProps = OpacityProps & BorderProps & ColorProps;

export type ControlIndicationProps = {
  focusIndication?: IndicationProps;
  hoverIndication?: IndicationProps;
  disabledIndication?: IndicationProps;
};

export const controlIndication = <Props extends ControlIndicationProps>({
  theme,
  focusIndication,
  disabledIndication,
  hoverIndication,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];

  if (disabledIndication) {
    styles.push(css`
      &:disabled {
        ${border({ theme, ...disabledIndication })}
        ${color({ theme, ...disabledIndication })}
        ${opacity({ theme, ...disabledIndication })}
      }
    `);
  }

  if (focusIndication) {
    styles.push(css`
      &:focus {
        ${border({ theme, ...focusIndication })}
        ${color({ theme, ...focusIndication })}
        ${opacity({ theme, ...focusIndication })}
      }
    `);
  }

  if (hoverIndication) {
    styles.push(css`
      &:hover {
        ${border({ theme, ...hoverIndication })}
        ${color({ theme, ...hoverIndication })}
        ${opacity({ theme, ...hoverIndication })}
      }
    `);
  }

  return styles;
};

export type PlaceholderProps = Pick<ColorProps, 'fg'> & FontProps;

export type ControlPlaceholderProps = {
  controlPlaceholder?: PlaceholderProps;
};

export const controlPlaceholder = <Props extends ControlPlaceholderProps>({
  theme,
  controlPlaceholder,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];

  if (controlPlaceholder) {
    styles.push(css`
      &::placeholder {
        ${font({ theme, ...controlPlaceholder })}
        ${color({ theme, ...controlPlaceholder })}
      }
    `);
  }

  return styles;
};
