import { ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { font, FontProps } from '@blubberfish/style-system';
import { scales } from './gradient';

const GlobalStyle = createGlobalStyle<FontProps>`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    ${font}
  }
`;

export type ThemeProps = {
  children?: ReactNode;
};

export const Theme = ({ children }: ThemeProps) => (
  <ThemeProvider
    theme={{
      colors: {
        background: '#333333',
        background_strong: 'black',
        background_weak: '#555555',
        background_shadow: '#fff8',
      },
      images: {
        home: '/assets/img/accent-background.jpg',
        home_gradient: scales('#358', '#333'),
      },
    }}
  >
    <GlobalStyle ft="sans-serif" ftSize={2} />
    {children}
  </ThemeProvider>
);
