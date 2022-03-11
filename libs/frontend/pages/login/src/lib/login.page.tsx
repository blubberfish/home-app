import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  AlertType,
  Box,
  Button,
  Panel,
} from '@blubberfish/frontend/components';
import { FrontEndLoginPath } from '@blubberfish/types';
import {
  loginThunk,
  loginErrorSelector,
  loginPendingSelector,
} from '@blubberfish/frontend/shared/login';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const pending = useSelector(loginPendingSelector);
  const alertMessage = useSelector(loginErrorSelector);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const submit = useCallback(() => {
    dispatch(loginThunk({ username, password }));
  }, [dispatch, username, password]);

  return (
    <Panel
      display="grid"
      gridAutoRows="min-content"
      gridGap={2}
      alignContent="center"
    >
      {alertMessage && <Alert type={AlertType.Error}>{alertMessage}</Alert>}
      <input
        disabled={!!pending}
        onChange={({ target: { value } }) => {
          setUsername(value);
        }}
        placeholder="Username"
        value={username}
      />
      <input
        disabled={!!pending}
        onChange={({ target: { value } }) => {
          setPassword(value);
        }}
        placeholder="Password"
        value={password}
      />
      <Button disabled={!!pending} onClick={submit} variant="primary">
        LOGIN
      </Button>
      <Box
        mx={3}
        display="grid"
        gridGap={3}
        gridTemplateRows="min-content"
        gridTemplateColumns="1fr max-content 1fr"
        alignItems="center"
      >
        <Box borderBottom="1px solid #0003" />
        <span>or</span>
        <Box borderBottom="1px solid #0003" />
      </Box>
      <a href={FrontEndLoginPath.NewUser}>New user?</a>
    </Panel>
  );
};
