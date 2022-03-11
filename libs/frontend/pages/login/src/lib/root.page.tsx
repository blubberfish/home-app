import { Route, Switch } from 'react-router-dom';
import { Box } from '@blubberfish/frontend/components';
import { FrontEndLoginPath } from '@blubberfish/types';
import { LoginPage } from './login.page';
import { NewUserPage } from './new-user.page';

export default () => (
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
        <Route path={FrontEndLoginPath.NewUser} component={NewUserPage} />
        <Route component={LoginPage} />
      </Switch>
    </Box>
  </Box>
);
