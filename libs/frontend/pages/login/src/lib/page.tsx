import { useCallback, useState } from 'react';
import { Box } from '@blubberfish/frontend/components';
import { login } from '@blubberfish/services/client';

export const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const submit = useCallback(() => {
    login({ username, password });
  }, [username, password]);
  return (
    <Box
      width="100%"
      height="100vh"
      display="grid"
      gridTemplateColumns="max-content"
      gridAutoRows="min-content"
      alignItems="center"
      justifyItems="center"
    >
      <input
        value={username}
        onChange={({ target: { value } }) => {
          setUsername(value);
        }}
      />
      <input
        value={password}
        onChange={({ target: { value } }) => {
          setPassword(value);
        }}
      />
      <button onClick={submit} type="button">
        Login
      </button>
    </Box>
  );
};
