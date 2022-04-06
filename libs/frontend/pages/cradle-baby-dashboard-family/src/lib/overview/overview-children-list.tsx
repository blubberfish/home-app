import { accountInfoSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import { useSelector } from 'react-redux';
import { PersonListSkeleton } from './components/person-list-skeleton';

export const OverviewChildrenList = () => {
  const account = useSelector(accountInfoSelector);

  return (
    <div>
      <h1>Our children</h1>
      <PersonListSkeleton data={account?.family.children} />
    </div>
  );
};
