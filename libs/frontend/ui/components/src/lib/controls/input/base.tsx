import { forwardRef, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  font,
  FontProps,
  fontStyle,
  FontStyleProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { controlIndication, ControlIndicationProps } from '../styles';

const BaseInput = styled.input<
  ColorProps &
  ControlIndicationProps &
  BorderProps &
  FontProps &
  FontStyleProps &
  PaddingProps &
  RadiusProps
  >`
  outline: 0;
  &:hover {
    text-decoration: underline;
  }
  ${border}
  ${color}
  ${controlIndication}
  ${font}
  ${fontStyle}
  ${padding}
  ${radius}
`;

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  (props: ComponentPropsWithoutRef<'input'>, ref) => {
    return (
      <BaseInput
        ref={ref}
        bg="background_strong"
        fg={'text-strong'}
        ftWeight={3}
        padX={3}
        padY={2}
        rad={0}
        bdr={{ size: 0 }}
        bdrB={{ size: 1 }}
        hoverIndication={{
          opacity: 2,
        }}
        disabledIndication={{
          opacity: 1,
        }}
        {...props}
      />
    );
  }
);
