import { grid, GridProps } from '@blubberfish/style-system';
import {
  BabyActivityType,
  BabyActivityProfilePayload,
} from '@blubberfish/types';
import moment, { Moment } from 'moment';
import { useMemo, useState } from 'react';
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
                current.activity,
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

const Container = styled.div<GridProps>`
  ${grid}
`;

const DashboardActivitiesDay = ({
  activities,
}: {
  activities: BabyActivityProfilePayload[];
}) => {
  const normalizedActivities = useTimeNormalizedActivities(activities);
  const content = useMemo(
    () =>
      new Array(24).fill(0).map((hour, i) => (
        <div key={i}>
          {(normalizedActivities[hour + i] ?? []).map((current) => (
            <span key={current.timestamp}>{current.activity}</span>
          ))}
        </div>
      )),
    [normalizedActivities]
  );
  return <div>{content}</div>;
};

export const DashboardActivitiesGrid = () => {
  const days = useLast3Days();
  const activities = useSelector(activitySelector);
  const normalizedActivities = useDateNormalizedActivities(activities);

  return (
    <Container gap={3}>
      {days.map((day) => {
        return (
          <div key={day.toISOString()}>
            <header>{day.format('DD MMM')}</header>
            <DashboardActivitiesDay
              activities={
                normalizedActivities[day.year()]?.[day.month()]?.[day.date()] ??
                []
              }
            />
          </div>
        );
      })}
    </Container>
  );
};
