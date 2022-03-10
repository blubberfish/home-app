import { useCallback, useState } from 'react';
import { login } from '@blubberfish/services/client'

export function App() {
  const [pending, setPending] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const submit = useCallback(() => {
    setPending(true)
    login({
      username,
      password
    }).finally(() => { setPending(false) })
  }, [username, password])

  return (
    <main>
      <input value={username} onChange={({ target: { value } }) => { setUsername(value) }} />
      <input value={password} onChange={({ target: { value } }) => { setPassword(value) }} />
      <button disabled={pending} type='button' onClick={submit}>Login</button>
    </main>
  );
}

export default App;
