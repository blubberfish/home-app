import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ApplicationLayout,
  Feather,
} from '@blubberfish/frontend/ui/components';
import { PATH } from '@blubberfish/frontend/pages/routes';

const LoginPage = () => {
  const navigate = useNavigate();
  const goHome = useCallback(() => {
    navigate(PATH.PRIVATE.DASHBOARD);
  }, [navigate]);
  return (
    <ApplicationLayout
      head={{
        right: (
          <button onClick={() => null}>
            <Feather.Menu />
          </button>
        ),
      }}
    ></ApplicationLayout>
  );
};
