import { Switch, Redirect, Route } from 'react-router-dom';

export default () => {
  return (
    <Switch>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};
