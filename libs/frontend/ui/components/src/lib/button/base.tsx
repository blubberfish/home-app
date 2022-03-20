import styled from 'styled-components';
import {
  background, border, color, padding, margin,
  BackgroundColorProps,
  ColorProps,
  BorderProps,
  PaddingProps,
  MarginProps,
} from '@blubberfish/frontend/ui/theme';
import { HTMLAttributes } from 'react';

type BaseButtonExtension = BackgroundColorProps &
  ColorProps &
  BorderProps &
  PaddingProps &
  MarginProps

export type BaseButtonProps = HTMLAttributes<HTMLButtonElement> & BaseButtonExtension

export const BaseButton = styled.button.attrs(
  (
    props: BaseButtonExtension
  ) =>
  ({
    type: 'button'
  } as BaseButtonProps)
)`
  ${background}
  ${border}
  ${color}
  ${padding}
  ${margin}
`;
