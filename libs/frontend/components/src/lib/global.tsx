import { PropsWithChildren } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { fontFamily, fontSize } from './theme/helpers';
import { FontFamilyProps, FontSizeProps, Theme } from '../types';

const Style = createGlobalStyle<FontFamilyProps & FontSizeProps>`
  ${fontFamily}
  ${fontSize}
`;

export const Global = <T extends Theme = Theme>({
  children,
  theme,
  ...rest
}: PropsWithChildren<
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
