import { Trash } from '@blubberfish/frontend/components/icons/font-awesome';
import {
  accountIdSelector,
  setAccountInfo,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import { deleteAccountChildren } from '@blubberfish/services/client';
import {
  alignment,
  AlignmentProps,
  color,
  ColorProps,
  grid,
  GridProps,
  indication,
  IndicationType,
  opacity,
  OpacityProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  confirmPending,
  dismissAlert,
  dismissPending,
  pendingActionSelector,
  setAlert,
  setPending,
} from './redux';

type ButtonIndicationProps = {
  indication?: {
    [IndicationType.Disabled]: OpacityProps;
    [IndicationType.Hover]: OpacityProps;
  };
};
const buttonDisabledIndication = indication<ButtonIndicationProps>(
  IndicationType.Disabled,
  [
    ({ theme, indication }) =>
      opacity({ theme, ...indication?.[IndicationType.Disabled] }),
  ]
);
const buttonHoverIndication = indication<ButtonIndicationProps>(
  IndicationType.Disabled,
  [
    ({ theme, indication }) =>
      opacity({ theme, ...indication?.[IndicationType.Hover] }),
  ]
);
const Button = styled.button<
  AlignmentProps &
  ColorProps &
  ButtonIndicationProps &
  GridProps &
  PaddingProps &
  RadiusProps
  >`
  outline: 0;
  margin: 0;
  border: 0;
  white-space: nowrap;
  ${alignment}
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${buttonDisabledIndication}
  ${buttonHoverIndication}
`;

export const ChildDeleteButton = () => {
  const baby = useParams()['id'];
  const dispatch = useDispatch();
  const account = useSelector(accountIdSelector);
  const pending = useSelector(pendingActionSelector);
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    if (!account) return;
    if (!baby) return;
    if (pending) {
      pending.action();
      return;
    }
    dispatch(
      setPending({
        id: 'child.delete',
        action: () => {
          dispatch(confirmPending());
          dispatch(dismissAlert());
          return deleteAccountChildren({
            account,
            data: [baby],
          })
            .then(
              (updatedInfo) => {
                updatedInfo && dispatch(setAccountInfo(updatedInfo));
                navigate('..')
              },
              (e) => {
                dispatch(
                  setAlert({
                    title: 'Something went wrong',
                    message: e.message,
                  })
                );
              }
            )
            .finally(() => {
              dispatch(dismissPending());
            });
        },
      })
    );
  }, [account, baby, dispatch, navigate, pending]);
  return (
    <Button
      disabled={pending?.started}
      bg={pending ? 'error' : 'transparent'}
      fg={pending ? 'text' : 'error'}
      indication={{
        [IndicationType.Disabled]: {
          opacity: 1,
        },
        [IndicationType.Hover]: {
          opacity: 2,
        },
      }}
      type="button"
      templateColumns="repeat(2, max-content)"
      templateRows="min-content"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
      gap={2}
      padX={3}
      padY={2}
      rad={2}
      onClick={handleClick}
    >
      <Trash />
      <span>{pending ? 'Confirm?' : 'Delete'}</span>
    </Button>
  );
};
