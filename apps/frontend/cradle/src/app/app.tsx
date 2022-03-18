import { Provider } from 'react-redux';
import AppRoutes from './components/routes';
import store from './redux';

export function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
