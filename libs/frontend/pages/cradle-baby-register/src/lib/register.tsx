import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { Button } from '@blubberfish/frontend/ui/components';
import { Module } from '@blubberfish/frontend/modules/core';
import slice, { successSelector } from './redux';
import { RegisterAlert } from './register-alert';
import { RegisterForm } from './register-form';
import { RegisterLayout } from './register-layout';
import { RegisterSuccess } from './register-success';
import { RegisterTitle } from './register-title';

const RegisterPage = () => {
  const success = useSelector(successSelector);
  const navigate = useNavigate();
  const handleCancel = useCallback(() => {
    navigate(`../${PATH.LOGIN}`);
  }, [navigate]);
  return (
    <RegisterLayout>
      <RegisterTitle />
      {success ? (
        <RegisterSuccess />
      ) : (
        <>
          <RegisterAlert />
          <RegisterForm />
          <Button invert label="Cancel" onClick={handleCancel} simple />
        </>
      )}
    </RegisterLayout>
  );
};

export default () => (
  <Module slice={slice}>
    <RegisterPage />
  </Module>
);
