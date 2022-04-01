import {
  color,
  ColorProps,
  grid,
  GridProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import {
  BabyActivityType,
  BabyActivityProfilePayload,
} from '@blubberfish/types';
import moment from 'moment';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { activitySelector } from './redux';

const useLast3Days = () => {
  return useMemo(
    () =>
      new Array(3)
        .fill(null)
        .map((_, i) =>
          moment()
            .subtract(i, 'days')
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
        )
        .reverse(),
    []
  );
};

type NormalizedActivityMap = {
  [year: number]: {
    [month: number]: {
      [date: number]: BabyActivityProfilePayload[];
    };
  };
};

const useDateNormalizedActivities = (data: BabyActivityProfilePayload[]) =>
  useMemo(
    () =>
      data.reduce<NormalizedActivityMap>((seed, current) => {
        const time = moment(current.timestamp);
        return {
          ...seed,
          [time.year()]: {
            ...seed[time.year()],
            [time.month()]: {
              ...seed[time.year()]?.[time.month()],
              [time.date()]: [
                ...(seed[time.year()]?.[time.month()]?.[time.date()] ?? []),
                current,
              ],
            },
          },
        } as NormalizedActivityMap;
      }, {}),
    [data]
  );

const useTimeNormalizedActivities = (data: BabyActivityProfilePayload[]) =>
  useMemo(
    () =>
      data.reduce(
        (seed: { [hour: number]: BabyActivityProfilePayload[] }, activity) => {
          const time = moment(activity.timestamp);
          return {
            ...seed,
            [time.hour()]: [...(seed[time.hour()] ?? []), activity],
          };
        },
        {}
      ),
    [data]
  );

const Grid = styled.div<ColorProps & GridProps & RadiusProps & SizeProps>`
  ${color}
  ${grid}
  ${radius}
  ${size}
`;

const Indicator = styled.div<ColorProps>`
  ${color}
`;

const colors: { [key in BabyActivityType]: string } = {
  'baby:activity:feed': 'green',
  'baby:activity:sleep': 'blue',
  'baby:activity:wake': 'red',
};

const DashboardActivitiesDay = ({
  activities,
}: {
  activities: BabyActivityProfilePayload[];
}) => {
  const normalizedActivities = useTimeNormalizedActivities(activities);
  const content = useMemo(
    () =>
      new Array(24).fill(0).map((hour, i) => (
        <Grid
          key={i}
          overflow="hidden"
          bg="background_weak"
          templateColumns="1fr"
          autoRows="1fr"
          autoFlow="row"
          gap="1px"
          rad={2}
        >
          {(normalizedActivities[hour + i] ?? []).map((current, i) => (
            <Indicator key={i} bg={colors[current.activity]} />
          ))}
        </Grid>
      )),
    [normalizedActivities]
  );
  return (
    <Grid
      templateColumns="repeat(24, 24px)"
      templateRows="repeat(1, 24px)"
      autoFlow="column dense"
      gap={1}
    >
      {content}
    </Grid>
  );
};

export const DashboardActivitiesGrid = () => {
  const days = useLast3Days();
  const activities = useSelector(activitySelector);
  const normalizedActivities = useDateNormalizedActivities(activities);

  return (
    <Grid gap={1} templateRows="repeat(3, max-content)">
      {days.map((day) => {
        return (
          <DashboardActivitiesDay
            activities={
              normalizedActivities[day.year()]?.[day.month()]?.[day.date()] ??
              []
            }
          />
        );
      })}
    </Grid>
  );
};
