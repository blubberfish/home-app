import { grid, GridProps } from '@blubberfish/style-system';
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import { activitySelector } from './redux';

const Container = styled.div<GridProps>`
  ${grid}
`;

export const DashboardActivitiesGrid = () => {
  const activities = useSelector(activitySelector)
  return <Container gap={3}>
    {activities.map(({ _id, activity, timestamp, notes }) => <div key={_id}>
      {activity}
      {timestamp}
      {notes}
    </div>)}
  </Container>
};

