import {
  accountIdSelector,
  selectChildById,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  Button,
  ConstrainedLayout,
  FontAwesome,
} from '@blubberfish/frontend/ui/components';
import { usePendingAction } from '@blubberfish/frontend/hooks';
import {
  logWakeActivity,
  logFeedActivity,
  logSleepActivity,
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
} from '@blubberfish/style-system';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentBabySelector } from './redux';

const ConstrainedContainer = styled(ConstrainedLayout) <
  AlignmentProps & GridProps & PaddingProps
  >`
  ${alignment}
  ${grid}
  ${padding}
`;

const Container = styled.div<
  ColorProps & GridProps & PaddingProps & RadiusProps
  >`
  ${color}
  ${grid}
  ${padding}
  ${radius}
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
    padY={2}
    padX={3}
    rad={2}
    gap={2}
    templateColumns="max-content 1fr"
    templateRows="min-content"
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
  Wake,
  Sleep,
  Feed,
}

export const DashboardBabyActions = () => {
  const [blockActions, setBlockActions] = useState(false);
  const [pending, setPending, execute, cancel] = usePendingAction();
  const account = useSelector(accountIdSelector);
  const baby = useSelector(
    selectChildById(useSelector(currentBabySelector) ?? '')
  );
  const handleBabyWakeUp = useCallback(() => {
    if (pending?.id === ActionType.Wake) {
      execute();
    }
    if (!(account && baby)) return;
    setPending(() => ({
      id: ActionType.Wake,
      action: () => {
        setBlockActions(true);
        return logWakeActivity({
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

  useEffect(() => {
    !baby && cancel && cancel();
  }, [baby, cancel]);

  if (!baby) return null;
  return (
    <ListContainer>
      <Button
        disabled={blockActions || (pending && pending.id !== ActionType.Wake)}
        ftSize={3}
        simple
        onClick={handleBabyWakeUp}
      >
        <ButtonContentContainer>
          <FontAwesome.SmileBeam />
          <Text ftAlign='left'>
            {!blockActions && pending && pending.id === ActionType.Wake
              ? 'Confirm?'
              : 'Wake up'}
          </Text>
        </ButtonContentContainer>
      </Button>
      <Button
        ftSize={3}
        disabled={blockActions || (pending && pending.id !== ActionType.Feed)}
        simple
        onClick={handleBabyFeeding}
      >
        <ButtonContentContainer>
          <FontAwesome.CookieBite />
          <Text ftAlign='left'>
            {!blockActions && pending && pending.id === ActionType.Feed
              ? 'Confirm?'
              : 'Feed'}
          </Text>
        </ButtonContentContainer>
      </Button>
      <Button
        ftSize={3}
        disabled={blockActions || (pending && pending.id !== ActionType.Sleep)}
        simple
        onClick={handleBabySleep}
      >
        <ButtonContentContainer>
          <FontAwesome.Bed />
          <Text ftAlign='left'>
            {!blockActions && pending && pending.id === ActionType.Sleep
              ? 'Confirm?'
              : 'Sleep'}
          </Text>
        </ButtonContentContainer>
      </Button>
    </ListContainer>
  );
};
