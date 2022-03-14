import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '@blubberfish/frontend/components';

import App, { store } from './app';

const theme = {
  colors: {
    primary: 'steelblue',
    'primary-text': 'white',
    background: 'whitesmoke',
    'background-strong': 'white',
    'background-weak': 'gainsboro',
    error: 'crimson',
    'error-accent': 'lavenderblush',
    success: 'forestgreen',
    'success-accent': 'honeydew',
    warning: 'goldenrod',
    'warning-accent': 'ivory',
    info: 'dimgray',
    'info-accent': 'ghostwhite',
  },
};

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyle bg="background" font="sans-serif" size={18} theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalStyle>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
