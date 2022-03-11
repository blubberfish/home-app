import { Route, Switch } from 'react-router-dom';
import LoginPage, {
  PATH as LoginPath,
} from '@blubberfish/frontend/pages/login';

export function App() {
  return (
    <Switch>
      <Route path={LoginPath} component={LoginPage} />
      <Route>
        <span>TEST</span>
      </Route>
    </Switch>
  );
}
