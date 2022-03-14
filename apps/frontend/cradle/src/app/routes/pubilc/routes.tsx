import { lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { FrontEndPublicPath } from '@blubberfish/frontend/pages/routes';

const LandingPage = lazy(() => import('@blubberfish/frontend/pages/landing'));
// const LoginPage = lazy(() => import('@blubberfish/frontend/pages/login'));

export default () => {
  return (
    <Switch>
      <Route path={FrontEndPublicPath.Root} component={LandingPage} exact />
      <Route path={FrontEndPublicPath.Login} component={() => null} />
      <Route>
        <Redirect to={FrontEndPublicPath.Root} />
      </Route>
    </Switch>
  );
};
