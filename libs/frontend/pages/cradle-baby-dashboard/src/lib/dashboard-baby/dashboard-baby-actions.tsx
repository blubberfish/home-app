import {
  accountIdSelector,
  selectAllChildren,
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
  grid,
  GridProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const GenderIcon = ({ gender }: { gender?: string }) =>
  gender === 'f' ? <FontAwesome.Venus /> : <FontAwesome.Mars />;

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
    templateColumns={`repeat(3, max-content)`}
    autoRows="min-content"
    autoFlow="dense"
    justifyContent="center"
  >
    {children}
  </ConstrainedContainer>
);

enum ActionType {
  Wake,
  Sleep,
  Feed,
}

export const DashboardBabyActions = () => {
  const [pending, setPending, execute, cancel] = usePendingAction();
  const dispatch = useDispatch();
  const account = useSelector(accountIdSelector);
  const children = useSelector(selectAllChildren);
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
      action: () =>
        logWakeActivity({
          account,
          baby: baby.uuid,
        }).finally(() => {
          setPending(() => undefined);
        }),
    }));
  }, [account, baby, execute, pending?.id, setPending]);
  const handleBabyFeeding = useCallback(() => {
    if (pending?.id === ActionType.Feed) {
      execute();
    }
    if (!(account && baby)) return;
    setPending(() => ({
      id: ActionType.Feed,
      action: () =>
        logFeedActivity({
          account,
          baby: baby.uuid,
        }).finally(() => {
          setPending(() => undefined);
        }),
    }));
  }, [account, baby, execute, pending?.id, setPending]);
  const handleBabySleep = useCallback(() => {
    if (pending?.id === ActionType.Sleep) {
      execute();
    }
    if (!(account && baby)) return;
    setPending(() => ({
      id: ActionType.Sleep,
      action: () =>
        logSleepActivity({
          account,
          baby: baby.uuid,
        }).finally(() => {
          setPending(() => undefined);
        }),
    }));
  }, [account, baby, execute, pending?.id, setPending]);

  useEffect(() => {
    !baby && cancel && cancel()
  }, [baby, cancel])

  if (!baby) return null;
  return (
    <ListContainer>
      <Button
        disabled={pending && pending.id !== ActionType.Wake}
        simple
        onClick={handleBabyWakeUp}
      >
        <ButtonContentContainer>
          <span>Wake up</span>
        </ButtonContentContainer>
      </Button>
      <Button
        disabled={pending && pending.id !== ActionType.Feed}
        simple
        onClick={handleBabyFeeding}
      >
        <ButtonContentContainer>
          <FontAwesome.CookieBite />
          <span>Feed</span>
        </ButtonContentContainer>
      </Button>
      <Button
        disabled={pending && pending.id !== ActionType.Sleep}
        simple
        onClick={handleBabySleep}
      >
        <ButtonContentContainer>
          <span>Sleep</span>
        </ButtonContentContainer>
      </Button>
    </ListContainer>
  );
};
