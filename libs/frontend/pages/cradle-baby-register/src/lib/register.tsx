import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { Button } from '@blubberfish/frontend/ui/components';
import { RegisterForm } from './register-form';
import { RegisterLayout } from './register-layout';
import { RegisterTitle } from './register-title';

const NewUserPage = () => {
  const navigate = useNavigate();
  const handleCancel = useCallback(() => {
    navigate(`../${PATH.LOGIN}`);
  }, [navigate]);
  return (
    <RegisterLayout>
      <RegisterTitle />
      <RegisterForm />
      <Button invert label="Cancel" onClick={handleCancel} simple />
    </RegisterLayout>
  );
};

export default NewUserPage;
