import styled from 'styled-components';
import { color, typography } from '../theme/helpers';
import { ColorProps, TypographyProps } from '../../types';

export const BaseText = styled.span<ColorProps & TypographyProps>`
  box-spacing: border-box;
  ${color}
  ${typography}
`;
