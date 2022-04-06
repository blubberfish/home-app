import { accountInfoSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import { DASHBOARD_FAMILY_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, generatePath } from 'react-router-dom';
import { PersonListSkeleton } from './components/person-list-skeleton';

export const OverviewChildrenList = () => {
  const account = useSelector(accountInfoSelector);
  const navigate = useNavigate();
  const handleViewDetails = useCallback(
    (uuid: string) => {
      navigate(generatePath(`../${DASHBOARD_FAMILY_PATH.CHILD}`, { id: uuid }));
    },
    [navigate]
  );

  return (
    <div>
      <h1>Our children</h1>
      <PersonListSkeleton
        data={account?.family.children}
        onClick={handleViewDetails}
      />
    </div>
  );
};
