import { useCallback, useState } from 'react';
import { Alert, AlertType, Box, Panel } from '@blubberfish/frontend/components';
import { login } from '@blubberfish/services/client';
import { SUB_PATH } from './config';

export const LoginPage = () => {
  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [alertMessage, setAlertMessage] = useState<string>();

  const submit = useCallback(() => {
    setPending(true);
    setAlertMessage(() => undefined);
    login({ username, password })
      .then(
        () => {
          //
        },
        ({ message }) => {
          setAlertMessage(message);
        }
      )
      .finally(() => {
        setPending(false);
      });
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
        disabled={pending}
        onChange={({ target: { value } }) => {
          setUsername(value);
        }}
        placeholder="Username"
        value={username}
      />
      <input
        disabled={pending}
        onChange={({ target: { value } }) => {
          setPassword(value);
        }}
        placeholder="Password"
        value={password}
      />
      <button disabled={pending} onClick={submit} type="button">
        Login
      </button>
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
      <a href={SUB_PATH.NEW_USER}>New user?</a>
    </Panel>
  );
};
