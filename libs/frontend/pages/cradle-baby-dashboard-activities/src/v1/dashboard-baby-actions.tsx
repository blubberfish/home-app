import {
  accountIdSelector,
  selectChildById,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  Button,
  ContrainedBox as ConstrainedLayout,
  FontAwesome,
} from '@blubberfish/frontend/ui/components';
import { usePendingAction } from '@blubberfish/frontend/hooks';
import {
  logFeedActivity,
  logSleepActivity,
  logNursingActivity,
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
  padding,
  PaddingProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentBabySelector } from './redux';

const ConstrainedContainer = styled(ConstrainedLayout)<
  AlignmentProps & GridProps & PaddingProps
>`
  ${alignment}
  ${grid}
  ${padding}
`;

const Container = styled.div<
  AlignmentProps &
    ColorProps &
    GridProps &
    PaddingProps &
    RadiusProps &
    SizeProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${size}
`;

const ButtonContentContainer = ({
  color,
  children,
}: {
  color?: string;
  children: ReactNode;
}) => (
  <Container
    bg={color ?? 'background_weak'}
    pad={2}
    rad="50%"
    gap={2}
    alignContent="center"
    alignItems="center"
    justifyContent="center"
    justifyItems="center"
    templateColumns="max-content"
    templateRows="1f min-content"
    h="5em"
    w="5em"
  >
    {children}
  </Container>
);

const ListContainer = ({ children }: { children: ReactNode }) => (
  <ConstrainedContainer
    gap={3}
    pad={3}
    templateColumns="max-content"
    autoRows="min-content"
    autoFlow="row"
    alignItems="center"
    justifyItems="stretch"
    justifyContent="center"
  >
    {children}
  </ConstrainedContainer>
);

const Text = styled.span<FontProps>`
  ${font}
`;

enum ActionType {
  Feed,
  Nursing,
  Sleep,
}

export const DashboardBabyActions = () => {
  const [blockActions, setBlockActions] = useState(false);
  const [pending, setPending, execute, cancel] = usePendingAction();
  const account = useSelector(accountIdSelector);
  const baby = useSelector(
    selectChildById(useSelector(currentBabySelector) ?? '')
  );
  const handleBabyNursing = useCallback(() => {
    if (pending?.id === ActionType.Nursing) {
      execute();
    }
    if (!(account && baby)) return;
    setPending(() => ({
      id: ActionType.Nursing,
      action: () => {
        setBlockActions(true);
        return logNursingActivity({
          account,
          baby: baby.uuid,
        }).finally(() => {
          setBlockActions(false);
          setPending(() => undefined);
        });
      },
    }));
  }, [account, baby, execute, pending?.id, setPending]);
  const handleBabyFeeding = useCallback(() => {
    if (pending?.id === ActionType.Feed) {
      execute();
    }
    if (!(account && baby)) return;
    setPending(() => ({
      id: ActionType.Feed,
      action: () => {
        setBlockActions(true);
        return logFeedActivity({
          account,
          baby: baby.uuid,
        }).finally(() => {
          setBlockActions(false);
          setPending(() => undefined);
        });
      },
    }));
  }, [account, baby, execute, pending?.id, setPending]);
  const handleBabySleep = useCallback(() => {
    if (pending?.id === ActionType.Sleep) {
      execute();
    }
    if (!(account && baby)) return;
    setPending(() => ({
      id: ActionType.Sleep,
      action: () => {
        setBlockActions(true);
        return logSleepActivity({
          account,
          baby: baby.uuid,
        }).finally(() => {
          setBlockActions(false);
          setPending(() => undefined);
        });
      },
    }));
  }, [account, baby, execute, pending?.id, setPending]);

  const pendingConfirmation = blockActions ? null : pending ? pending.id : null;

  useEffect(() => {
    !baby && cancel && cancel();
  }, [baby, cancel]);

  if (!baby) return null;
  return (
    <ListContainer>
      <Button
        ftSize={3}
        disabled={blockActions}
        simple
        onClick={handleBabyFeeding}
      >
        <ButtonContentContainer
          color={
            pendingConfirmation === ActionType.Feed ? 'success' : undefined
          }
        >
          <FontAwesome.CookieBite />
          <Text ftAlign="left" ftSize={2}>
            {pendingConfirmation === ActionType.Feed ? 'Confirm?' : 'Feed'}
          </Text>
        </ButtonContentContainer>
      </Button>
      <Button
        disabled={blockActions}
        ftSize={3}
        simple
        onClick={handleBabyNursing}
      >
        <ButtonContentContainer
          color={
            pendingConfirmation === ActionType.Nursing ? 'success' : undefined
          }
        >
          <FontAwesome.Mitten />
          <Text ftAlign="left" ftSize={2}>
            {pendingConfirmation === ActionType.Nursing ? 'Confirm?' : 'Nurse'}
          </Text>
        </ButtonContentContainer>
      </Button>
      <Button
        ftSize={3}
        disabled={blockActions}
        simple
        onClick={handleBabySleep}
      >
        <ButtonContentContainer
          color={
            pendingConfirmation === ActionType.Sleep ? 'success' : undefined
          }
        >
          <FontAwesome.Bed />
          <Text ftAlign="left" ftSize={2}>
            {!blockActions && pending && pending.id === ActionType.Sleep
              ? 'Confirm?'
              : 'Sleep'}
          </Text>
        </ButtonContentContainer>
      </Button>
      {!blockActions && pending && (
        <Button ftSize={3} simple onClick={cancel}>
          <ButtonContentContainer color="error">
            <Text ftAlign="left">Cancel</Text>
          </ButtonContentContainer>
        </Button>
      )}
    </ListContainer>
  );
};
