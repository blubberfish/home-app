import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@blubberfish/frontend/components';
import { createUser } from '@blubberfish/services/client';
import { CreateUserPayload } from '@blubberfish/types';
import { PATH } from './config';

export const NewUserPage = () => {
  const [userPayload, setUserPayload] = useState<CreateUserPayload>({
    familyName: '',
    givenName: '',
    password: '',
    username: '',
  });
  const history = useHistory();
  const submit = useCallback(() => {
    createUser(userPayload);
  }, [userPayload]);
  const cancel = useCallback(() => {
    history.replace(PATH);
  }, [history]);
  return (
    <Box
      display="grid"
      alignContent="center"
      gridGap={2}
      gridAutoRows="min-content"
      p={3}
    >
      <input
        placeholder="Family name"
        value={userPayload.familyName}
        onChange={({ target: { value } }) => {
          setUserPayload((payload) => ({ ...payload, familyName: value }));
        }}
      />
      <input
        placeholder="Given name"
        value={userPayload.givenName}
        onChange={({ target: { value } }) => {
          setUserPayload((payload) => ({ ...payload, givenName: value }));
        }}
      />
      <input
        placeholder="Preferred name"
        value={userPayload.preferredName ?? ''}
        onChange={({ target: { value } }) => {
          setUserPayload((payload) => ({
            ...payload,
            preferredName: value || undefined,
          }));
        }}
      />
      <input
        placeholder="Username"
        value={userPayload.username}
        onChange={({ target: { value } }) => {
          setUserPayload((payload) => ({ ...payload, username: value }));
        }}
      />
      <input
        placeholder="Password"
        value={userPayload.password}
        onChange={({ target: { value } }) => {
          setUserPayload((payload) => ({ ...payload, password: value }));
        }}
      />
      <button type="button" onClick={submit}>
        Submit
      </button>
      <button type="button" onClick={cancel}>
        Cancel
      </button>
    </Box>
  );
};
