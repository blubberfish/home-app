import { Switch, Redirect, Route } from 'react-router-dom';
import LoginPage, {
  PATH as LoginPath,
} from '@blubberfish/frontend/pages/login';

export default () => {
  return (
    <Switch>
      <Route path={LoginPath} component={LoginPage} />
      <Route>
        <Redirect to={LoginPath} />
      </Route>
    </Switch>
  );
};
