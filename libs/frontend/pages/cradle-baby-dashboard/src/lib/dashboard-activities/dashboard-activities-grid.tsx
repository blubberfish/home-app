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
import { BabyActivityType } from '@blubberfish/types';
import moment from 'moment';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { normalizedDataSelector, TimeNormalizedActivity } from './redux';

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
  'baby:activity:nurse': 'yellow',
};

const DashboardActivitiesDay = ({
  activities,
}: {
  activities: TimeNormalizedActivity;
}) => {
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
          {(activities[hour + i] ?? []).map((current, i) => (
            <Indicator key={i} bg={colors[current.activity]} />
          ))}
        </Grid>
      )),
    [activities]
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
  const normalizedActivities = useSelector(normalizedDataSelector);

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
