import { accountIdSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  alignment,
  AlignmentProps,
  color,
  ColorProps,
  font,
  FontProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
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
} from '../hooks';
import { activityLogThunk } from '../redux';

const responsiveContainer = responsive<AlignmentProps>(alignment);
const Container = styled.div<
  AlignmentProps &
    ColorProps &
    GridProps &
    PaddingProps &
    ResponsiveProps<AlignmentProps> &
    RadiusProps &
    SizeProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${size}
  ${responsiveContainer}
`;

const Text = styled.span<FontProps>`
  ${font}
`;

const labels: { [key in BabyActivityType]: string } = {
  'baby:activity:feed': 'Feeding started',
  'baby:activity:feed:bottle': 'Started bottle feeding',
  'baby:activity:feed:latch:l': 'Latched onto left side',
  'baby:activity:feed:latch:r': 'Latched onto right side',
  'baby:activity:nurse:defecate': 'Defecated',
  'baby:activity:nurse:urinate': 'Urinated',
  'baby:activity:nurse': 'Nursing started',
  'baby:activity:sleep': 'Fell asleep',
  'baby:activity:wake': 'Wake up',
};

const colors: { [key in BabyActivityType]: string } = {
  'baby:activity:feed': 'aliceblue',
  'baby:activity:feed:bottle': 'aliceblue',
  'baby:activity:feed:latch:l': 'aliceblue',
  'baby:activity:feed:latch:r': 'aliceblue',
  'baby:activity:nurse:defecate': 'LemonChiffon',
  'baby:activity:nurse:urinate': 'LemonChiffon',
  'baby:activity:nurse': 'LemonChiffon',
  'baby:activity:sleep': 'background_weak',
  'baby:activity:wake': 'background_weak',
};

export const ChildActivitiesList = () => {
  const visualType = useVisualizationType();
  const dispatch = useDispatch();
  const account = useSelector(accountIdSelector);
  const baby = useChild();
  const last3Days = useLast3Days();
  const activityMap = useNormalizedActivities();
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
          bg={colors[activity]}
          fg="text_invert"
          gap={1}
          padX={2}
          padY={1}
          rad={2}
          templateColumns="1fr"
          templateRows="repeat(2, min-content)"
        >
          <Text ftSize={1} ftWeight={2}>
            {moment(timestamp).format('YYYY-MMM-DD, HH:mm')}
          </Text>
          <Text>{labels[activity]}</Text>
        </Container>
      ))}
    </Container>
  );
};
