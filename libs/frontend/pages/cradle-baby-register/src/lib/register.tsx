import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { Button } from '@blubberfish/frontend/ui/components';
import { Module } from '@blubberfish/frontend/modules/core';
import slice from './redux';
import { RegisterAlert } from './register-alert';
import { RegisterForm } from './register-form';
import { RegisterLayout } from './register-layout';
import { RegisterTitle } from './register-title';

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleCancel = useCallback(() => {
    navigate(`../${PATH.LOGIN}`);
  }, [navigate]);
  return (
    <RegisterLayout>
      <RegisterTitle />
      <RegisterAlert />
      <RegisterForm />
      <Button invert label="Cancel" onClick={handleCancel} simple />
    </RegisterLayout>
  );
};

export default () => (
  <Module slice={slice}>
    <RegisterPage />
  </Module>
);
