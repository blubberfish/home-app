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
  alignment,
  AlignmentProps,
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
  responsive,
  ResponsiveProps,
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
  dismissAlert,
  setAlert,
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

type ResponsiveContainerProps = AlignmentProps & GridProps;
const responsiveContainer = responsive<ResponsiveContainerProps>((props) => [
  ...(alignment(props) ?? []),
  ...(grid(props) ?? []),
]);
const Container = styled.div<
  GridProps & ResponsiveProps<ResponsiveContainerProps>
>`
  ${grid}
  ${responsiveContainer}
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
            const error = (e: Error) => {
              dispatch(
                setAlert({
                  title: 'Unable to log activity',
                  message: `Something went wrong. ${e}`,
                })
              );
            };
            const success = () => {
              const pronoun = child.gender === 'm' ? 'his' : 'her';
              dispatch(
                setAlert({
                  type: 'success',
                  title: 'Activity logged',
                  message: `${pronoun.replace(
                    'h',
                    'H'
                  )} activity has been recorded. Go to history to see ${pronoun} past activities.`,
                })
              );
            };
            const finalise = () => {
              dispatch(dismissPending());
            };
            dispatch(dismissAlert());
            dispatch(confirmPending());
            switch (activity) {
              case 'baby:activity:feed':
                return logFeedActivity({
                  account,
                  baby: child.uuid,
                })
                  .then(success, error)
                  .finally(finalise);
              case 'baby:activity:nurse':
                return logNursingActivity({
                  account,
                  baby: child.uuid,
                })
                  .then(success, error)
                  .finally(finalise);
              case 'baby:activity:sleep':
                return logSleepActivity({
                  account,
                  baby: child.uuid,
                })
                  .then(success, error)
                  .finally(finalise);
              case 'baby:activity:wake':
                return logWakeActivity({
                  account,
                  baby: child.uuid,
                })
                  .then(success, error)
                  .finally(finalise);
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
      autoRows="min-content"
      responsive={[
        {
          alignContent: 'center',
          justifyItems: 'center',
          autoFlow: 'row',
          autoColumns: '1fr',
        },
        {
          alignContent: 'start',
          autoFlow: 'column',
          autoRows: 'min-content',
          autoColumns: 'max-content',
        },
      ]}
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
              if (pending?.id === activity && !pending.active) {
                pending.action();
              }
            }}
            type="button"
          >
            <Icon />
            <P ftSize={1}>
              {pending?.id === activity ? 'Confirm?' : label[activity]}
            </P>
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
          <P ftSize={1}>Cancel</P>
        </Button>
      )}
    </Container>
  );
};
