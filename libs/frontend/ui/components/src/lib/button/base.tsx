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

type ButtonExtension = BackgroundColorProps &
  ColorProps &
  BorderProps &
  IndicationProps &
  PaddingProps &
  MarginProps &
  RadiusProps;

export type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  ButtonExtension;

export const BaseButton = styled.button.attrs(
  (props: ButtonProps) =>
  ({
    type: 'button',
    bg: 'lightgray',
    px: 3,
    py: 2,
    ...props,
    radius: {
      all: 3,
      ...props.radius,
    },
    indication: {
      disabled: {
        opacity: 0.5,
        ...props.indication?.disabled,
      },
      hover: {
        opacity: 0.81,
        ...props.indication?.hover
      },
      ...props.indication,
    },
    border: {
      all: 'none',
      ...props.border,
    },
  } as ButtonProps)
)`
  ${background}
  ${border}
  ${color}
  ${indication}
  ${padding}
  ${margin}
  ${radius}
`;
