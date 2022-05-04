import { ComponentPropsWithoutRef, forwardRef, useMemo } from 'react';
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

const BaseButton = styled.button<
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
  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
  ${border}
  ${color}
  ${controlIndication}
  ${font}
  ${fontStyle}
  ${padding}
  ${radius}
`;

export type ButtonPropsExtension = {
  simple?: boolean;
  invert?: boolean;
  label?: string;
} & Pick<FontProps, 'ftSize'> &
  ColorProps;

export type ButtonProps = ButtonPropsExtension &
  ComponentPropsWithoutRef<'button'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, simple, invert, children, ...props }: ButtonProps, ref) => {
    const child = useMemo(() => {
      if (children) {
        return children;
      }
      return label;
    }, [children, label]);
    return (
      <BaseButton
        ref={ref}
        bg={
          simple ? 'transparent' : invert ? 'background_invert' : 'background'
        }
        fg={invert ? 'text_invert' : 'text'}
        ftWeight={3}
        padX={simple ? 0 : 3}
        padY={simple ? 0 : 2}
        rad={2}
        bdr={{ size: 0 }}
        type="button"
        hoverIndication={{
          opacity: 2,
        }}
        disabledIndication={{
          opacity: 1,
        }}
        {...props}
      >
        {child}
      </BaseButton>
    );
  }
);
