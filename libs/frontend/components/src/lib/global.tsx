import { PropsWithChildren } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { background, fontFamily, fontSize } from './theme/helpers';
import {
  BackgroundColorProps,
  FontFamilyProps,
  FontSizeProps,
  Theme,
} from '../types';

const Style = createGlobalStyle<
  BackgroundColorProps & FontFamilyProps & FontSizeProps
>`
  body {
    margin: 0;
    ${fontFamily}
    ${fontSize}
    ${background}
  }
`;

export const Global = <T extends Theme = Theme>({
  children,
  theme,
  ...rest
}: PropsWithChildren<
  BackgroundColorProps &
    FontFamilyProps &
    FontSizeProps & {
      theme?: T;
    }
>) => (
  <ThemeProvider theme={theme}>
    <Style {...rest} />
    {children}
  </ThemeProvider>
);
