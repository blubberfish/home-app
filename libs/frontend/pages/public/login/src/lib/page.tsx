import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Grid } from '@blubberfish/frontend/components';
import { usePromise } from '@blubberfish/frontend/hooks';
import { CurrentUser } from '@blubberfish/types';
import { setCurrentUser } from '@blubberfish/frontend/modules/shared/session';
import { login, currentUser } from '@blubberfish/services/client';

export const Page = () => {
  const dispatch = useDispatch();
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
        }),
    [username, password]
  );
  const [pending, run] = usePromise(loginPromiseFactory);

  useEffect(() => {
    !pending && user && dispatch(setCurrentUser(user));
  }, [dispatch, pending, user]);

  return (
    <Grid
      bg="steelblue"
      grid={{
        alignContent: 'center',
        templateColumns: '1fr max-content',
        templateRows: 'min-content',
      }}
      px={5}
      w="100%"
      minH="100vh"
    >
      <Box />
      <Grid
        bg="whitesmoke"
        radius={{ all: 4 }}
        grid={{
          alignContent: 'center',
          autoRows: 'min-content',
          autoFlow: 'row',
          templateColumns: '1fr',
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
