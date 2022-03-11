import { Route, Switch } from 'react-router-dom';
import LoginPage from '@blubberfish/frontend/pages/login';

export function App() {
  return (
    <Switch>
      <Route component={LoginPage} />
    </Switch>
  );
}
