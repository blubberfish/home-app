import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/routes';
import { NewUserButton } from './new-user-button'
import { NewUserForm } from './new-user-form'
import { NewUserLayout } from './new-user-layout'

const NewUserPage = () => {
  const navigate = useNavigate();
  const handleCancel = useCallback(() => {
    navigate(`../${PATH.PUBLIC.LOGIN}`);
  }, [navigate]);
  return (
    <NewUserLayout>
      <h1>New account</h1>
      <NewUserForm />
      <NewUserButton simple label='Cancel' onClick={handleCancel} />
    </NewUserLayout>
  );
};

export default NewUserPage
