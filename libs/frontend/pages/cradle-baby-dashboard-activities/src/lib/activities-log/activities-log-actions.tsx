import {
  CookieBite,
  Mitten,
  SmileBeam,
  Bed,
  X,
} from '@blubberfish/frontend/components/icons/font-awesome';
import { accountIdSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  API,
  logBottleFeedActivity,
  logLatchLeftFeedActivity,
  logLatchRightFeedActivity,
  logNursingDefecateActivity,
  logNursingUrinationActivity,
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
import { BabyActivityType, BabyActivityPayload } from '@blubberfish/types';
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
  IndicationType.Disabled,
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
      service: {
        [key in BabyActivityType]?: API<BabyActivityPayload, void>;
      };
    } => ({
      list: [
        'baby:activity:feed:bottle',
        'baby:activity:feed:latch:l',
        'baby:activity:feed:latch:r',
        'baby:activity:nurse:defecate',
        'baby:activity:nurse:urinate',
      ],
      icon: {
        'baby:activity:feed': CookieBite,
        'baby:activity:feed:bottle': CookieBite,
        'baby:activity:feed:latch:l': CookieBite,
        'baby:activity:feed:latch:r': CookieBite,
        'baby:activity:nurse': Mitten,
        'baby:activity:nurse:defecate': Mitten,
        'baby:activity:nurse:urinate': Mitten,
        'baby:activity:sleep': Bed,
        'baby:activity:wake': SmileBeam,
      },
      label: {
        'baby:activity:feed': 'Feed',
        'baby:activity:feed:bottle': 'Bottle',
        'baby:activity:feed:latch:l': 'Latch (L)',
        'baby:activity:feed:latch:r': 'Latch (R)',
        'baby:activity:nurse': 'Nurse',
        'baby:activity:nurse:defecate': 'Defecation',
        'baby:activity:nurse:urinate': 'Urination',
        'baby:activity:sleep': 'Sleep',
        'baby:activity:wake': 'Wake',
      },
      service: {
        'baby:activity:feed:bottle': logBottleFeedActivity,
        'baby:activity:feed:latch:l': logLatchLeftFeedActivity,
        'baby:activity:feed:latch:r': logLatchRightFeedActivity,
        'baby:activity:nurse:defecate': logNursingDefecateActivity,
        'baby:activity:nurse:urinate': logNursingUrinationActivity,
      },
    }),
    []
  );

export const LogActions = () => {
  const dispatch = useDispatch();
  const account = useSelector(accountIdSelector);
  const pending = useSelector(pendingSelector);
  const child = useChild();
  const { list, icon, label, service } = useActivities();
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
            const remote = service[activity];
            if (remote) {
              return remote({
                account,
                baby: child.uuid,
              })
                .then(success, error)
                .finally(finalise);
            }
            return Promise.resolve();
          },
        })
      );
    },
    [account, child, dispatch, service]
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
