import { Route, Switch } from 'react-router-dom';
import { Box } from '@blubberfish/frontend/components';
import { Module } from '@blubberfish/frontend/redux';
import reduxSlice from './module';
import { LoginPage } from './login.page';
import { NewUserPage } from './new-user.page';
import { SUB_PATH } from './config';

export default () => (
  <Module slice={reduxSlice}>
    <Box
      width="100%"
      height="100vh"
      display="grid"
      gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
      gridAutoRows="1fr"
    >
      <Box
        bg="background.0"
        display="grid"
        gridColumn={[1, 2]}
        gridTemplateColumns="1fr"
        gridTemplateRows="1fr"
      >
        <Switch>
          <Route path={SUB_PATH.NEW_USER} component={NewUserPage} />
          <Route component={LoginPage} />
        </Switch>
      </Box>
    </Box>
  </Module>
);
