import { PropsWithChildren } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { typography, color } from '../theme/helpers';
import { ColorProps, TypographyProps, Theme } from '../../types';

const Style = createGlobalStyle<ColorProps & TypographyProps>`
  body {
    margin: 0;
    ${color}
    ${typography}
  }
`;

export type GlobalStyleProps = PropsWithChildren<{ theme?: Theme }>;

export const GlobalStyle = ({
  children,
  theme = { spacings: [0, 4, 8, 16, 24, 32, 64] },
}: GlobalStyleProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Style font="sans-serif" />
      {children}
    </ThemeProvider>
  );
};
