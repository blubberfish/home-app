import styled from 'styled-components';
import {
  border,
  color,
  indication,
  padding,
  radius,
  BorderProps,
  ColorProps,
  IndicationProps,
  PaddingProps,
  RadiusProps,
} from '@blubberfish/frontend/ui/theme';

type InputExtension = BorderProps &
  ColorProps &
  IndicationProps &
  PaddingProps &
  RadiusProps;

export const Input = styled.input.attrs(
  (props) =>
  ({
    px: 16,
    py: 8,
    border: {
      all: {
        size: 1,
        color: 'dimgray',
      },
    },
    radius: {
      all: 4,
    },
    ...props,
  } as InputExtension)
)`
  ${border}
  ${indication}
  ${padding}
  ${radius}
`;
