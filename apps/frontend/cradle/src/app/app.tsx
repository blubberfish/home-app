import { Provider } from 'react-redux';
import { GlobalStyle } from '@blubberfish/frontend/ui/components';
import AppRoutes from './components/routes';
import store from './redux';

export function App() {
  return (
    <Provider store={store}>
      <GlobalStyle>
        <AppRoutes />
      </GlobalStyle>
    </Provider>
  );
}

export default App;
