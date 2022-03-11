import { Switch, Redirect, Route } from 'react-router-dom';

const empty = () => <div />;

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={empty} />
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};
