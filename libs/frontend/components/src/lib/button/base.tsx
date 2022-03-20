import styled from 'styled-components';
import { background, border, color, padding, margin } from '../theme/helpers';
import {
  BackgroundColorProps,
  ColorProps,
  BorderProps,
  PaddingProps,
  MarginProps,
} from '../../types';
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
