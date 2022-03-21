import styled from 'styled-components';
import {
  background,
  border,
  color,
  indication,
  padding,
  margin,
  radius,
  BackgroundColorProps,
  ColorProps,
  BorderProps,
  PaddingProps,
  MarginProps,
  RadiusProps,
  IndicationProps,
} from '@blubberfish/frontend/ui/theme';
import { HTMLAttributes } from 'react';

type BaseButtonExtension = BackgroundColorProps &
  ColorProps &
  BorderProps &
  IndicationProps &
  PaddingProps &
  MarginProps &
  RadiusProps;

export type BaseButtonProps = HTMLAttributes<HTMLButtonElement> &
  BaseButtonExtension;

export const BaseButton = styled.button.attrs(
  (props: BaseButtonExtension) =>
    ({
      type: 'button',
      bg: 'lightgray',
      border: {
        all: 'none',
        ...props.border,
      },
      indication: {
        ...props.indication,
        opacity: {
          disabled: 0.5,
          hover: 0.81,
          ...props.indication?.opacity,
        },
      },
      px: 3,
      py: 2,
      radius: {
        all: 3,
        ...props.radius,
      },
      ...props,
    } as BaseButtonProps)
)`
  ${background}
  ${border}
  ${color}
  ${indication}
  ${padding}
  ${margin}
  ${radius}
`;
