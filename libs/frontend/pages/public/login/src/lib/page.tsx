import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@blubberfish/frontend/ui/components';
import { usePromise } from '@blubberfish/frontend/hooks';
import { Module } from '@blubberfish/frontend/modules/core';
import { PATH } from '@blubberfish/frontend/pages/routes';
import { login, currentUser } from '@blubberfish/services/client';

import slice, { isUserLoggedInSelector, setLoggedIn } from './redux';

const Page = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isUserLoggedInSelector);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const loginPromiseFactory = useCallback(
    () =>
      login({
        username,
        password,
      }).then(() => {
        dispatch(setLoggedIn());
      }),
    [username, password, dispatch]
  );
  const [pending, run] = usePromise(loginPromiseFactory);

  useEffect(() => {
    isLoggedIn && navigate(PATH.PRIVATE.DASHBOARD);
  }, [dispatch, navigate, isLoggedIn]);

  useEffect(() => {
    !isLoggedIn &&
      currentUser().then((user) => {
        if (user) {
          dispatch(setLoggedIn());
        }
      });
  }, [dispatch, isLoggedIn]);

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

export default () => (
  <Module slice={slice}>
    <Page />
  </Module>
);
