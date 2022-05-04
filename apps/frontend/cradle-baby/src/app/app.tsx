import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux';
import AppRoutes from './components/routes';
import { Theme } from './components/theme';

export function App() {
  return (
    <Provider store={store}>
      <Theme>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Theme>
    </Provider>
  );
}

export default App;
