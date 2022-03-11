import styled from 'styled-components';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  space,
  SpaceProps,
  compose,
  variant,
} from 'styled-system';

const BaseButton = styled.button<
  BorderProps & ColorProps & SpaceProps & { variant?: string }
>(border, color, space);

export const Button = styled(BaseButton).attrs({
  borderWidth: 0,
  borderRadius: 4,
  bg: 'transparent',
  color: 'black',
  px: 3,
  py: 2,
})`
  ${compose(border, color, space)}
  ${variant({
    variants: {
      primary: {
        bg: 'primary',
        color: 'primary-text',
      },
    },
  })}

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.67;
  }
`;
