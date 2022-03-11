import { createGlobalStyle } from 'styled-components';
import { color, ColorProps, space, SpaceProps } from 'styled-system';

export const GlobalStyle = createGlobalStyle<ColorProps & SpaceProps>`
  * { box-sizing: border-box; }
body { 
  ${color}
  ${space}
 }
`;
