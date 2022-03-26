import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@blubberfish/frontend/ui/components';
import { usePromise } from '@blubberfish/frontend/hooks';
import { CurrentUser } from '@blubberfish/types';
import { setCurrentUser } from '@blubberfish/frontend/modules/shared/session';
import { PATH } from '@blubberfish/frontend/pages/routes';
import { login, currentUser } from '@blubberfish/services/client';

export const Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<CurrentUser>();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const loginPromiseFactory = useCallback(
    () =>
      login({
        username,
        password,
      })
        .then(() => currentUser())
        .then((currentUser) => {
          currentUser && setUser(currentUser);
          navigate(PATH.PRIVATE.DASHBOARD);
        }),
    [username, password, navigate]
  );
  const [pending, run] = usePromise(loginPromiseFactory);

  useEffect(() => {
    !pending && user && dispatch(setCurrentUser(user));
  }, [dispatch, pending, user]);

  return (
    <Grid
      grid={{
        templateColumns: 'max-content 1fr',
        templateRows: '1fr',
      }}
      w="100%"
      minH="100vh"
    >
      <Box p={32} bg="steelblue" />
      <Grid
        bg="whitesmoke"
        radius={{ all: 4 }}
        grid={{
          alignContent: 'center',
          autoRows: 'min-content',
          autoFlow: 'row',
          templateColumns: 'max-content',
          gap: 2,
        }}
        p={5}
      >
        <input
          disabled={pending}
          value={username}
          onChange={({ target: { value } }) => {
            setUsername(value);
          }}
        />
        <input
          disabled={pending}
          value={password}
          onChange={({ target: { value } }) => {
            setPassword(value);
          }}
        />
        <button onClick={run}>Sign In</button>
      </Grid>
    </Grid>
  );
};
