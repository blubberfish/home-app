import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { Button } from '@blubberfish/frontend/ui/components';
import { LoginDivider } from './login-divider';
import { LoginForm } from './login-form';
import { LoginLayout } from './login-layout';
import { LoginTitle } from './login-title';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleNewUser = useCallback(() => {
    navigate(`../${PATH.REGISTER}`);
  }, [navigate]);
  return (
    <LoginLayout>
      <LoginTitle />
      <LoginForm />
      <LoginDivider />
      <Button invert label="Create account" simple onClick={handleNewUser} />
    </LoginLayout>
  );
};

export default () => <LoginPage />;
