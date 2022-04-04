import { ComponentPropsWithoutRef, forwardRef, useMemo } from 'react';
import styled, { StyledProps } from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  font,
  FontProps,
  fontStyle,
  FontStyleProps,
  opacity,
  OpacityProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
  indication,
  IndicationType,
} from '@blubberfish/style-system';

export type ButtonIndicationProps = {
  indication?: {
    [type in IndicationType]?: BorderProps & ColorProps & OpacityProps;
  };
};

const hoverIndication = indication(IndicationType.Hover, [
  ({ indication, theme }: StyledProps<ButtonIndicationProps>) =>
    opacity({ theme, ...indication?.hover }),
  ({ indication, theme }: StyledProps<ButtonIndicationProps>) =>
    color({ theme, ...indication?.hover }),
  ({ indication, theme }: StyledProps<ButtonIndicationProps>) =>
    border({ theme, ...indication?.hover }),
]);

const focusIndication = indication(IndicationType.Focus, [
  ({ indication, theme }: StyledProps<ButtonIndicationProps>) =>
    opacity({ theme, ...indication?.focus }),
  ({ indication, theme }: StyledProps<ButtonIndicationProps>) =>
    color({ theme, ...indication?.focus }),
  ({ indication, theme }: StyledProps<ButtonIndicationProps>) =>
    border({ theme, ...indication?.focus }),
]);

const disabledIndication = indication(IndicationType.Disabled, [
  ({ indication, theme }: StyledProps<ButtonIndicationProps>) =>
    opacity({ theme, ...indication?.disabled }),
  ({ indication, theme }: StyledProps<ButtonIndicationProps>) =>
    color({ theme, ...indication?.disabled }),
  ({ indication, theme }: StyledProps<ButtonIndicationProps>) =>
    border({ theme, ...indication?.disabled }),
]);

const BaseButton = styled.button<
  BorderProps &
    ButtonIndicationProps &
    ColorProps &
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
  ${font}
  ${fontStyle}
  ${padding}
  ${radius}
  ${hoverIndication}
  ${focusIndication}
  ${disabledIndication}
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
        indication={{
          disabled: {
            opacity: 1,
          },
          hover: {
            opacity: 2,
          },
        }}
        {...props}
      >
        {child}
      </BaseButton>
    );
  }
);
