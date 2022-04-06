import { Mars, Venus } from '@blubberfish/frontend/components/icons/font-awesome';
import { selectChildById } from '@blubberfish/frontend/modules/cradle-baby/app';
import { DASHBOARD_FAMILY_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import moment from 'moment'
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';


export const ChildDetails = () => {
  const uuid = useParams()['id']
  const child = useSelector(selectChildById(uuid))
  if (!child) return <Navigate to={`../${DASHBOARD_FAMILY_PATH.OVERVIEW}`} />
  return (
    <div>
      <h1>Our children</h1>
      <section>
        <p>
          {child.name.en?.family} {child.name.en?.given}
        </p>
        {child.name.en?.preferred && (
          <p>
            {child.name.en?.preferred}
          </p>
        )}
      </section>
      <section>
        <p>
          {child.name.zh?.family}{child.name.zh?.given}
        </p>
        {child.name.zh?.preferred && (
          <p>
            {child.name.zh?.preferred}
          </p>
        )}
      </section>
      <section>
        {child.gender === 'm' ? <Mars /> : <Venus />}
      </section>
      <section>
        {moment(child.dtob).format('DD MMM YYYY')}
      </section>
    </div>
  );
};
