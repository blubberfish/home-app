import { selectChildById } from '@blubberfish/frontend/modules/cradle-baby/app';
import { BabyActivityProfilePayload } from '@blubberfish/types';
import moment from 'moment';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { activitySelector, filterSelector } from '../redux';

export const useChild = () => {
  const { uuid } = useParams();
  return useSelector(selectChildById(uuid));
};

export const useLast3Days = () => {
  return useMemo(
    () =>
      new Array(3)
        .fill(null)
        .map((_, i) => moment().subtract(i, 'days'))
        .reverse(),
    []
  );
};

export type ActivityTimeMap = {
  [year: number]: {
    [month: number]: {
      [date: number]: {
        [hour: number]: BabyActivityProfilePayload[];
      };
    };
  };
};

export const useNormalizedActivities = () => {
  const activityHistory = useSelector(activitySelector);
  const filters = useSelector(filterSelector);
  return useMemo(() => {
    const normalization: ActivityTimeMap = {};
    activityHistory.forEach((data) => {
      const timestamp = moment(data.timestamp);
      normalization[timestamp.year()] = normalization[timestamp.year()] ?? {};
      normalization[timestamp.year()][timestamp.month()] =
        normalization[timestamp.year()][timestamp.month()] ?? {};
      normalization[timestamp.year()][timestamp.month()][timestamp.date()] =
        normalization[timestamp.year()][timestamp.month()][timestamp.date()] ??
        {};
      normalization[timestamp.year()][timestamp.month()][timestamp.date()][
        timestamp.hour()
      ] =
        normalization[timestamp.year()][timestamp.month()][timestamp.date()][
          timestamp.hour()
        ] ?? [];
      if (filters[data.activity]) {
        normalization[timestamp.year()][timestamp.month()][timestamp.date()][
          timestamp.hour()
        ].push(data);
      }
    });
    return normalization;
  }, [activityHistory, filters]);
};
