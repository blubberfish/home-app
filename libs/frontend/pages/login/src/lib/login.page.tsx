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

export const LoginPage = () => {
  const dispatch = useDispatch()
  const pending = false;
  const alertMessage = null;
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const submit = useCallback(() => {
    /** @todo */
  }, [username, password]);

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
