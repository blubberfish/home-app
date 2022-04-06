import {
  alignment,
  AlignmentProps,
  color,
  ColorProps,
  grid,
  GridProps,
  position,
  PositionProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import moment from 'moment';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  normalizedDataSelector,
  TimeNormalizedActivity,
  dataSetLoadingSelector,
  colorsSelector,
} from './redux';
import { getInitialState } from './redux/base';

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

const Grid = styled.div<
  AlignmentProps &
    ColorProps &
    GridProps &
    PositionProps &
    RadiusProps &
    SizeProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${position}
  ${radius}
  ${size}
`;

const Indicator = styled.div<ColorProps>`
  ${color}
`;

const DashboardActivitiesDay = ({
  activities,
}: {
  activities: TimeNormalizedActivity;
}) => {
  const colors = useSelector(colorsSelector);
  const content = useMemo(
    () =>
      new Array(24).fill(0).map((hour, i) => (
        <Grid
          key={i}
          overflow="hidden"
          bg="background_weak"
          autoColumns="1fr"
          autoRows="1fr"
          autoFlow="row"
          rad={2}
        >
          {(activities[hour + i] ?? []).map((current, i) => (
            <Indicator
              key={i}
              bg={(colors ?? getInitialState().colors)[current.activity]}
            />
          ))}
        </Grid>
      )),
    [activities, colors]
  );
  return (
    <Grid
      templateColumns="repeat(1, 24px)"
      templateRows="repeat(24, 24px)"
      autoFlow="column dense"
      gap="1px"
      pos="relative"
    >
      {content}
    </Grid>
  );
};

const DataLoadingScreen = () => {
  const loading = useSelector(dataSetLoadingSelector);
  if (!loading) {
    return null;
  }
  return (
    <Grid
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
      bg="#fff3"
      pos="absolute"
      posX={0}
      posY={0}
      rad={2}
    >
      Loading
    </Grid>
  );
};

export const DashboardActivitiesGrid = () => {
  const days = useLast3Days();
  const normalizedActivities = useSelector(normalizedDataSelector);

  return (
    <Grid
      justifyContent="center"
      gap="1px"
      templateColumns="repeat(3, max-content)"
      templateRows="repeat(1, max-content)"
      pos="relative"
    >
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
      <DataLoadingScreen />
    </Grid>
  );
};