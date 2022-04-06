import { Plus } from '@blubberfish/frontend/components/icons/font-awesome';
import { accountInfoSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import { DASHBOARD_FAMILY_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, generatePath } from 'react-router-dom';

export const ChildDetails = () => {
  return (
    <div>
      <h1>Our children</h1>
    </div>
  );
};
