import {
  CookieBite,
  Mitten,
  SmileBeam,
  Bed,
  X,
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
  font,
  FontProps,
  grid,
  GridProps,
  indication,
  IndicationType,
  padding,
  PaddingProps,
  opacity,
  OpacityProps,
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

type ButtonIndicationProps = {
  indication?: {
    [key in IndicationType]?: ColorProps & OpacityProps;
  };
};
const buttonDisabledIndication = indication<ButtonIndicationProps>(
  IndicationType.Hover,
  [
    ({ indication, theme }) =>
      color({ theme, ...indication?.[IndicationType.Disabled] }),
    ({ indication, theme }) =>
      opacity({ theme, ...indication?.[IndicationType.Disabled] }),
  ]
);
const buttonHoverIndication = indication<ButtonIndicationProps>(
  IndicationType.Hover,
  [
    ({ indication, theme }) =>
      color({ theme, ...indication?.[IndicationType.Hover] }),
    ({ indication, theme }) =>
      opacity({ theme, ...indication?.[IndicationType.Hover] }),
  ]
);
const Button = styled.button<
  ButtonIndicationProps &
    ColorProps &
    FontProps &
    GridProps &
    PaddingProps &
    SizeProps
>`
  color: currentColor;
  border: 0;
  border-radius: 50%;
  outline: 0;
  margin: 0;
  align-content: center;
  justify-content: center;
  justify-items: center;
  grid-template-columns: max-content;
  grid-template-rows: repeat(2, min-content);
  p {
    margin: 0;
  }
  svg {
    height: 1em;
    width: 1em;
    fill: currentColor;
  }
  ${color}
  ${font}
  ${grid}
  ${padding}
  ${size}
  ${buttonHoverIndication}
  ${buttonDisabledIndication}
`;

const P = styled.p<FontProps>`
  ${font}
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
      if (!account || !child) return;
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
    [account, child, dispatch]
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
            h="96px"
            w="96px"
            ftSize={3}
            gap={1}
            bg={pending?.id === activity ? 'success' : 'background_weak'}
            disabled={pending?.active}
            indication={{
              [IndicationType.Hover]: {
                opacity: 2,
              },
              [IndicationType.Disabled]: {
                opacity: 1,
              },
            }}
            onClick={() => {
              if (pending?.id !== activity) handleLog(activity);
            }}
            type="button"
          >
            <Icon />
            <P ftSize={2}>{label[activity]}</P>
          </Button>
        );
      })}
      {pending && !pending.active && (
        <Button
          h="96px"
          w="96px"
          gap={1}
          ftSize={3}
          bg="error"
          disabled={pending?.active}
          indication={{
            [IndicationType.Hover]: {
              opacity: 2,
            },
            [IndicationType.Disabled]: {
              opacity: 1,
            },
          }}
          onClick={() => {
            dispatch(dismissPending());
          }}
          type="button"
        >
          <X />
          <P ftSize={2}>Cancel</P>
        </Button>
      )}
    </Container>
  );
};
