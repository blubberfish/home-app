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
import {
  controlIndication,
  ControlIndicationProps,
  controlPlaceholder,
  ControlPlaceholderProps,
} from '../styles';

const BaseInput = styled.input<
  ColorProps &
  ControlIndicationProps &
  ControlPlaceholderProps &
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
  ${controlPlaceholder}
  ${font}
  ${fontStyle}
  ${padding}
  ${radius}
`;

export type InputProps = {
  invert?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invert, ...props }: InputProps, ref) => {
    return (
      <BaseInput
        ref={ref}
        bg="transparent"
        fg={invert ? 'text_invert_strong' : 'text_strong'}
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
        controlPlaceholder={{
          ftAlign: 'center'
        }}
        {...props}
      />
    );
  }
);
