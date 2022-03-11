import { lazy } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom';
import {
  FrontEndPath
} from '@blubberfish/types';

const LandingPage = lazy(() => import('@blubberfish/frontend/pages/landing'))
const LoginPage = lazy(() => import('@blubberfish/frontend/pages/login'))

export default () => {
  return (
    <Switch>
      <Route path={FrontEndPath.Root} component={LandingPage} exact />
      <Route path={FrontEndPath.Login} component={LoginPage} />
      <Route>
        <Redirect to={FrontEndPath.Root} />
      </Route>
    </Switch>
  );
};
