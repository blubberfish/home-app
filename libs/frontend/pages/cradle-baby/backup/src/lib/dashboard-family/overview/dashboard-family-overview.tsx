import {
  Button,
  ContrainedBox as ConstrainedLayout,
  FontAwesome,
} from '@blubberfish/frontend/ui/components';
import {
  accountIdSelector,
  accountInfoSelector,
  setAccountInfo,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  deleteAccountChildren,
  clearBabyActivityLog,
} from '@blubberfish/services/client';
import {
  AlignmentProps,
  alignment,
  BorderProps,
  border,
  ColorProps,
  color,
  FontProps,
  font,
  GridProps,
  grid,
  PaddingProps,
  padding,
  RadiusProps,
  radius,
  SizeProps,
  size,
} from '@blubberfish/style-system';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ListSkeleton } from './dashboard-family-skeleton';
import { PATH } from '../../dashboard-paths';

const AddMemberButton = styled(Button)`
  svg {
    height: 2em;
    width: 2em;
  }
`;

const Container = styled.div<
  AlignmentProps &
    BorderProps &
    ColorProps &
    GridProps &
    PaddingProps &
    RadiusProps &
    SizeProps
>`
  ${alignment}
  ${border}
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${size}
`;

const ConstrainedContainer = styled(ConstrainedLayout)<
  AlignmentProps & ColorProps & GridProps & PaddingProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${padding}
`;

const Text = styled.p<ColorProps & FontProps & SizeProps>`
  margin: 0;
  svg {
    fill: currentColor;
    height: 1em;
    width: 1em;
  }
  ${color}
  ${font}
  ${size}
`;

export const DashboardFamilyOverview = () => {
  const [pending, setPending] = useState<{
    message: string;
    action: () => Promise<void>;
  } | null>(null);
  const dispatch = useDispatch();
  const accountId = useSelector(accountIdSelector);
  const account = useSelector(accountInfoSelector);
  const navigate = useNavigate();
  const handleDeleteChild = useCallback(
    (uuid: string) => {
      if (!accountId) return;
      const child = account?.family.children.find(
        (child) => child.uuid === uuid
      );
      if (child) {
        setPending({
          message: `Are you sure you want to remove ${
            child.name.en?.preferred ?? child.name.en?.given
          } from your family?`,
          action: () =>
            clearBabyActivityLog({
              account: accountId,
              baby: uuid,
            })
              .then(() =>
                deleteAccountChildren({
                  account: accountId,
                  data: [uuid],
                })
              )
              .then((accountInfo) => {
                accountInfo && dispatch(setAccountInfo(accountInfo));
              })
              .catch((error) => {
                /** @todo */
                console.error(error);
              })
              .finally(() => {
                setPending(null);
              }),
        });
      }
    },
    [account, accountId, dispatch]
  );

  return pending ? (
    <ConstrainedContainer gap={5} pad={3}>
      <Container
        bg="background_weak"
        justifyItems="center"
        justifyContent="center"
        templateRows="repeat(2, min-content)"
        templateColumns="1fr"
        gap={3}
        rad={3}
        padX={3}
        padY={2}
      >
        <Text>{pending.message}</Text>
        <Container
          gap={3}
          alignItems="center"
          justifyContent="space-evenly"
          templateRows="min-content"
          templateColumns="repeat(2, max-content)"
        >
          <Button
            onClick={() => {
              pending.action();
            }}
          >
            Yes
          </Button>
          <Button
            bg="error"
            onClick={() => {
              setPending(() => null);
            }}
          >
            No
          </Button>
        </Container>
      </Container>
    </ConstrainedContainer>
  ) : (
    <ConstrainedContainer gap={5} pad={3}>
      {account?.family.parents.length ? (
        <Container
          gap={3}
          pad={3}
          rad={3}
          justifyItems="center"
          templateColumns="1fr"
        >
          <Text>Our adults</Text>
          <ListSkeleton disabled={!!pending} persons={account.family.parents} />
        </Container>
      ) : null}
      <Container
        gap={3}
        pad={3}
        rad={3}
        justifyItems="center"
        templateColumns="1fr"
      >
        <Text>Our children</Text>
        <ListSkeleton
          disabled={!!pending}
          persons={account?.family.children}
          onDelete={handleDeleteChild}
        />
        <AddMemberButton
          simple
          disabled={!!pending}
          onClick={() => {
            navigate(PATH.ADD_CHILD);
          }}
        >
          <Container
            bdr={{ size: 2, color: 'background_weak', line: 'dashed' }}
            gap={2}
            padY={2}
            padX={3}
            rad={3}
            alignItems="center"
            templateColumns="max-content 1fr"
          >
            <FontAwesome.Plus width={32} height={32} />
            <Text>Add new child</Text>
          </Container>
        </AddMemberButton>
      </Container>
    </ConstrainedContainer>
  );
};
