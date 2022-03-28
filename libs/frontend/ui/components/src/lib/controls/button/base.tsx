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

const BaseButton = styled.button<
  ColorProps &
  BorderProps &
  FontProps &
  FontStyleProps &
  PaddingProps &
  RadiusProps
  >`
  ${border}
  ${color}
  ${font}
  ${fontStyle}
  ${padding}
  ${radius}

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.5;
  }

  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
`;

export type ButtonProps = {
  simple?: boolean;
  label?: string;
  onClick?: () => void;
};

export const Button = ({ label, simple, onClick }: ButtonProps) => {
  return (
    <BaseButton
      bg={simple ? 'transparent' : 'background'}
      fg={simple ? 'background' : 'background_invert'}
      ftWeight={3}
      padX={simple ? 0 : 3}
      padY={simple ? 0 : 2}
      rad={2}
      bdr={{ size: 0 }}
      onClick={onClick}
      type='button'
    >
      {label}
    </BaseButton>
  );
};
