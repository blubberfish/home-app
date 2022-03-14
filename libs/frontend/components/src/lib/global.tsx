import { createGlobalStyle } from 'styled-components';
import { typography } from './theme/helpers';
import { TypographyProps } from '../types';

const Style = createGlobalStyle<TypographyProps>`
  ${typography}
`;
