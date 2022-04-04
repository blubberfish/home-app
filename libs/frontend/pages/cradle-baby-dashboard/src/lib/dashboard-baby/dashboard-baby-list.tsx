import {
  selectAllChildren,
  selectChildById,
} from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  Button,
  ContrainedBox as ConstrainedLayout,
  FontAwesome,
} from '@blubberfish/frontend/ui/components';
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
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentBabySelector, resetBaby, setBaby } from './redux';

const ConstrainedContainer = styled(ConstrainedLayout)<
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

const ListContainer = ({
  children,
  columns,
}: {
  children: ReactNode;
  columns: number;
}) => (
  <ConstrainedContainer
    gap={3}
    pad={3}
    templateColumns={`repeat(${Math.max(columns, 1)}, max-content)`}
    autoRows="min-content"
    autoFlow="dense"
    justifyContent="center"
  >
    {children}
  </ConstrainedContainer>
);

export const DashboardBabyList = () => {
  const dispatch = useDispatch();
  const children = useSelector(selectAllChildren);
  const baby = useSelector(
    selectChildById(useSelector(currentBabySelector) ?? '')
  );

  useEffect(() => {
    children.length === 1 && dispatch(setBaby(children[0].uuid));
  }, [children, dispatch]);

  if (baby)
    return (
      <ListContainer columns={1}>
        <Button
          ftSize={2}
          simple
          onClick={() => {
            dispatch(resetBaby());
          }}
        >
          <ButtonContentContainer color="error">
            <FontAwesome.X />
            <span>{baby.name.en?.preferred ?? baby.name.en?.given}</span>
          </ButtonContentContainer>
        </Button>
      </ListContainer>
    );
  return (
    <ListContainer columns={Math.min(children.length, 3)}>
      {children.map((child) => (
        <Button
          ftSize={2}
          key={child.uuid}
          simple
          onClick={() => {
            dispatch(setBaby(child.uuid));
          }}
        >
          <ButtonContentContainer>
            <GenderIcon gender={child.gender} />
            <span>{child.name.en?.preferred ?? child.name.en?.given}</span>
          </ButtonContentContainer>
        </Button>
      ))}
    </ListContainer>
  );
};
