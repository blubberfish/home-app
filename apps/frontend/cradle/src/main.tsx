import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Theme } from 'styled-system';
import { GlobalStyle } from '@blubberfish/frontend/components';
import store from '@blubberfish/frontend/redux';

import App from './app';

const theme: Theme = {
  colors: {
    primary: 'steelblue',
    'primary-text': 'white',
    background: ['white', 'whitesmoke', 'gainsboro'],
    error: ['lavenderblush', 'crimson'],
    success: ['honeydew', 'forestgreen'],
    warning: ['ivory', 'goldenrod'],
    info: ['ghostwhite', 'dimgray'],
  },
};

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle
          bg="background.1"
          m={0}
          fontFamily="sans-serif"
          fontSize={['14px', '18px']}
        />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
