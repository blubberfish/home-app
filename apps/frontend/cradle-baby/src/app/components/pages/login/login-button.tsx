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

const Button = styled.button<
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

  svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
`;

export type LoginButtonProps = {
  simple?: boolean;
  label?: string;
  onClick?: () => void;
};

export const LoginButton = ({ label, simple, onClick }: LoginButtonProps) => {
  return (
    <Button
      bg={simple ? 'transparent' : 'background'}
      fg={simple ? 'background' : 'background_invert'}
      ftWeight={3}
      padX={simple ? 0 : 3}
      padY={simple ? 0 : 2}
      rad={2}
      bdr={{ size: 0 }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
