import { PropsWithChildren } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import {
  fontFamily,
  fontSize,
  FontFamilyProps,
  FontSizeProps,
  Theme,
} from 'styled-system';

const Style = createGlobalStyle<FontFamilyProps & FontSizeProps>`
  body {
    margin: 0;
    ${fontFamily}
    ${fontSize}
  }
`;

export type GlobalProps<T extends Theme> = PropsWithChildren<{
  theme: T;
}>;

export const Global = <T extends Theme>({
  children,
  theme,
}: GlobalProps<T>) => {
  return (
    <ThemeProvider theme={theme}>
      <Style />
      {children}
    </ThemeProvider>
  );
};
