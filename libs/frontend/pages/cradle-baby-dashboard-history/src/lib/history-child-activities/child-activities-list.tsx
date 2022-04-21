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
import {
  BabyActivityProfilePayload,
  BabyActivityType,
} from '@blubberfish/types';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  useChild,
  useVisualizationType,
  useLast3Days,
  useNormalizedActivities,
  VisualizationType,
} from './hooks';
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

const labels: { [key in BabyActivityType]: string } = {
  'baby:activity:feed': 'Feeding started',
  'baby:activity:nurse': 'Nursing started',
  'baby:activity:sleep': 'Fell asleep',
  'baby:activity:wake': 'Wake up',
};

export const ChildActivitiesList = () => {
  const visualType = useVisualizationType();
  const dispatch = useDispatch();
  const account = useSelector(accountIdSelector);
  const baby = useChild();
  const last3Days = useLast3Days();
  const activityMap = useNormalizedActivities();
  // const activityList = useMemo(
  //   () =>
  //     Object.values(
  //       activityMap[today.year()]?.[today.month()]?.[today.date()] ?? {}
  //     ).reduce((seed, current) => [...seed, ...current], []),
  //   [activityMap, today]
  // );
  const activityList = useMemo(
    () =>
      last3Days
        .reduce(
          (seed: BabyActivityProfilePayload[], current) => [
            ...seed,
            ...Object.values(
              activityMap[current.year()]?.[current.month()]?.[
              current.date()
              ] ?? {}
            ).reduce(
              (subSeed: BabyActivityProfilePayload[], list) => [
                ...subSeed,
                ...list,
              ],
              []
            ),
          ],
          []
        )
        .reverse(),
    [activityMap, last3Days]
  );

  useEffect(() => {
    account && baby && dispatch(activityLogThunk({ account, baby: baby.uuid }));
  }, [dispatch, account, baby]);

  if (visualType !== VisualizationType.list) return null;
  return (
    <Container
      templateColumns="1fr"
      autoRows="min-content"
      overflow="auto"
      gap={2}
    >
      {activityList.map(({ activity, timestamp }) => (
        <Container
          key={timestamp.toString()}
          gap={2}
          templateColumns="max-content 1fr"
        >
          <section>{labels[activity]}</section>
          <section>{moment(timestamp).format('YYYY-MMM-DD, HH:mm')}</section>
        </Container>
      ))}
    </Container>
  );
};
