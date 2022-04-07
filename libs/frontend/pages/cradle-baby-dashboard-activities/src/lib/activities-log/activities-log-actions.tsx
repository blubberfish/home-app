import {
  CookieBite,
  Mitten,
  SmileBeam,
  Bed,
} from '@blubberfish/frontend/components/icons/font-awesome';
import { accountIdSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  logFeedActivity,
  logNursingActivity,
  logSleepActivity,
  logWakeActivity,
} from '@blubberfish/services/client';
import {
  color,
  ColorProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { BabyActivityType } from '@blubberfish/types';
import { ComponentType, SVGProps, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useChild } from './hooks';
import {
  pendingSelector,
  setPending,
  confirmPending,
  dismissPending,
} from './redux';

const Button = styled.button<ColorProps & GridProps & PaddingProps>`
  border: 0;
  border-radius: 50%;
  grid-template-columns: max-content;
  grid-template-rows: repeat(2, min-content);
  ${color}
  ${grid}
  ${padding}
`;

const Container = styled.div<GridProps>`
  ${grid}
`;

const useActivities = () =>
  useMemo(
    (): {
      list: BabyActivityType[];
      icon: {
        [key in BabyActivityType]: ComponentType<SVGProps<SVGSVGElement>>;
      };
      label: {
        [key in BabyActivityType]: string;
      };
    } => ({
      list: [
        'baby:activity:feed',
        'baby:activity:nurse',
        'baby:activity:sleep',
      ],
      icon: {
        'baby:activity:feed': CookieBite,
        'baby:activity:nurse': Mitten,
        'baby:activity:sleep': Bed,
        'baby:activity:wake': SmileBeam,
      },
      label: {
        'baby:activity:feed': 'Feed',
        'baby:activity:nurse': 'Nurse',
        'baby:activity:sleep': 'Sleep',
        'baby:activity:wake': 'Wake',
      },
    }),
    []
  );

export const LogActions = () => {
  const dispatch = useDispatch();
  const account = useSelector(accountIdSelector);
  const pending = useSelector(pendingSelector);
  const child = useChild();
  const { list, icon, label } = useActivities();
  const handleLog = useCallback(
    (activity: BabyActivityType) => {
      if (!account || !child || !pending) return;
      dispatch(
        setPending({
          id: activity,
          action: () => {
            dispatch(confirmPending());
            switch (activity) {
              case 'baby:activity:feed':
                return logFeedActivity({
                  account,
                  baby: child.uuid,
                }).finally(() => dispatch(dismissPending()));
              case 'baby:activity:nurse':
                return logNursingActivity({
                  account,
                  baby: child.uuid,
                }).finally(() => dispatch(dismissPending()));
              case 'baby:activity:sleep':
                return logSleepActivity({
                  account,
                  baby: child.uuid,
                }).finally(() => dispatch(dismissPending()));
              case 'baby:activity:wake':
                return logWakeActivity({
                  account,
                  baby: child.uuid,
                }).finally(() => dispatch(dismissPending()));
              default:
                dispatch(dismissPending());
                return Promise.resolve();
            }
          },
        })
      );
    },
    [account, dispatch]
  );

  return (
    <Container
      autoFlow="row"
      autoRows="min-content"
      templateColumns="1fr"
      gap={3}
    >
      {list.map((activity) => {
        const Icon = icon[activity];
        return (
          <Button
            key={activity}
            type="button"
            onClick={() => {
              handleLog(activity);
            }}
          >
            <Icon />
            <p>{label[activity]}</p>
          </Button>
        );
      })}
    </Container>
  );
};
