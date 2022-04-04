import { forwardRef, ComponentPropsWithoutRef } from 'react';
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
  indication,
  IndicationType,
  padding,
  PaddingProps,
  opacity,
  OpacityProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';

export type InputIndicationProps = {
  indication?: {
    [type in IndicationType]?: BorderProps & ColorProps & OpacityProps;
  };
};

const hoverIndication = indication(IndicationType.Hover, [
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    opacity({ theme, ...indication?.[IndicationType.Hover] }),
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    color({ theme, ...indication?.[IndicationType.Hover] }),
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    border({ theme, ...indication?.[IndicationType.Hover] }),
]);

const focusIndication = indication(IndicationType.Focus, [
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    opacity({ theme, ...indication?.[IndicationType.Focus] }),
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    color({ theme, ...indication?.[IndicationType.Focus] }),
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    border({ theme, ...indication?.[IndicationType.Focus] }),
]);

const disabledIndication = indication(IndicationType.Disabled, [
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    opacity({ theme, ...indication?.[IndicationType.Disabled] }),
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    color({ theme, ...indication?.[IndicationType.Disabled] }),
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    border({ theme, ...indication?.[IndicationType.Disabled] }),
]);

const placeholderIndication = indication(IndicationType.Placeholder, [
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    opacity({ theme, ...indication?.[IndicationType.Placeholder] }),
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    color({ theme, ...indication?.[IndicationType.Placeholder] }),
  ({ indication, theme }: StyledProps<InputIndicationProps>) =>
    border({ theme, ...indication?.[IndicationType.Placeholder] }),
]);

const BaseInput = styled.input<
  ColorProps &
    BorderProps &
    FontProps &
    FontStyleProps &
    InputIndicationProps &
    PaddingProps &
    RadiusProps
>`
  outline: 0;
  &:hover {
    text-decoration: underline;
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
  ${placeholderIndication}
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
        bdrB={{ size: 1, color: invert ? '#0005' : '#fff5' }}
        indication={{
          hover: {
            opacity: 2,
          },
          disabled: {
            opacity: 1,
          },
          focus: {
            bdrB: {
              color: invert ? '#000d' : '#fffd',
            },
          },
        }}
        {...props}
      />
    );
  }
);
