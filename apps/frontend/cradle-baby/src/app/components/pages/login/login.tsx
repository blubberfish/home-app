import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Module } from '@blubberfish/frontend/modules/core';
import { PATH } from '@blubberfish/frontend/pages/routes';
import slice from './redux';
import { LoginLayout } from './login-layout';
import { LoginButton } from './login-button';
import { LoginContent } from './login-content';
import { LoginDivider } from './login-divider';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleNewUser = useCallback(() => {
    navigate(PATH.PUBLIC.NEW_USER);
  }, [navigate]);
  return (
    <LoginLayout>
      <LoginContent />
      <LoginDivider />
      <LoginButton label="Create account" simple onClick={handleNewUser} />
    </LoginLayout>
  );
};

export default () => (
  <Module slice={slice}>
    <LoginPage />
  </Module>
);
