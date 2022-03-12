import { createGlobalStyle } from 'styled-components';
import {
  color,
  ColorProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

export const GlobalStyle = createGlobalStyle<
  ColorProps & SpaceProps & TypographyProps
  >`
  * {
     box-sizing: border-box; 
  }
  body { 
    ${color}
    ${space}
    ${typography}
  }
`;
