import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { Button } from '@blubberfish/frontend/ui/components';
import { NewUserForm } from './new-user-form';
import { NewUserLayout } from './new-user-layout';

const NewUserPage = () => {
  const navigate = useNavigate();
  const handleCancel = useCallback(() => {
    navigate(`../${PATH.LOGIN}`);
  }, [navigate]);
  return (
    <NewUserLayout>
      <h1>New account</h1>
      <NewUserForm />
      <Button simple label="Cancel" onClick={handleCancel} />
    </NewUserLayout>
  );
};

export default NewUserPage;
