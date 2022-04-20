import { accountIdSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  alignment,
  AlignmentProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  responsive,
  ResponsiveProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useChild, useVisualizationType, useLast3Days, useNormalizedActivities, VisualizationType } from './hooks';
import { activityLogThunk } from './redux';

const responsiveContainer = responsive<AlignmentProps>(alignment);
const Container = styled.div<
  AlignmentProps &
  GridProps &
  PaddingProps &
  ResponsiveProps<AlignmentProps> &
  SizeProps
  >`
  ${alignment}
  ${grid}
  ${padding}
  ${responsiveContainer}
  ${size}
`;

export const ChildActivitiesList = () => {
  const visualType = useVisualizationType()
  const dispatch = useDispatch();
  const account = useSelector(accountIdSelector);
  const baby = useChild();
  const [today] = useLast3Days();
  const activityMap = useNormalizedActivities();
  const activityList = useMemo(
    () =>
      Object.values(activityMap[today.year()]?.[today.month()]?.[today.date()] ?? {}).reduce(
        (seed, current) => [...seed, ...current],
        []
      ),
    [activityMap, today]
  );

  useEffect(() => {
    account && baby && dispatch(activityLogThunk({ account, baby: baby.uuid }));
  }, [dispatch, account, baby]);

  if (visualType !== VisualizationType.list) return null
  return (
    <Container
      justifyItems="center"
      templateColumns="1fr"
      templateRows="1fr"
      responsive={[{ alignItems: 'center' }, { alignItems: 'start' }]}
      overflow="auto"
    >
      {activityList.map(activity => <div key={activity.timestamp.toString()}>
        <section>{activity.timestamp.toString()}</section>
        <section>{activity.activity}</section>
      </div>)}
    </Container>
  );
};
