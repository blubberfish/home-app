import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '@blubberfish/frontend/components';

import App from './app';
import store from './store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyle m={0} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
