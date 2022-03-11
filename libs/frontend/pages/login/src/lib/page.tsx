import { useCallback, useState } from 'react';
import { Alert, AlertType, Box, Panel } from '@blubberfish/frontend/components';
import { login } from '@blubberfish/services/client';

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
    <Box
      width="100%"
      height="100vh"
      display="grid"
      gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
      gridAutoRows="1fr"
    >
      <Panel
        borderRadius={0}
        display="grid"
        gridColumn={[1, 2]}
        gridGap={2}
        gridAutoRows="min-content"
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
      </Panel>
    </Box>
  );
};
