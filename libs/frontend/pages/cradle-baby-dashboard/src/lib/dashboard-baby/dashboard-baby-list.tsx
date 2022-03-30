import { accountChildrenSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  Button,
  ConstrainedLayout,
  FontAwesome,
} from '@blubberfish/frontend/ui/components';
import {
  color,
  ColorProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { currentBabySelector, setBaby } from './redux';

const ConstrainedContainer = styled(ConstrainedLayout) <
  GridProps & PaddingProps
  >`
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

export const DashboardBabyList = () => {
  const dispatch = useDispatch();
  const children = useSelector(accountChildrenSelector);
  const baby = useSelector(currentBabySelector);

  if (baby) return null;
  return (
    <ConstrainedContainer
      gap={3}
      pad={3}
      templateColumns={`repeat(3, max-content)`}
      autoRows="min-content"
      autoFlow="dense"
    >
      {children.map((child) => (
        <Button
          key={child.uuid}
          simple
          onClick={() => {
            dispatch(setBaby(child.uuid));
          }}
        >
          <Container
            bg="background_weak"
            padY={2}
            padX={3}
            rad={3}
            gap={3}
            templateColumns="max-content 1fr"
            templateRows="min-content"
          >
            {child.gender === 'f' ? (
              <FontAwesome.Venus />
            ) : (
              <FontAwesome.Mars />
            )}
            <span>{child.name.en?.preferred ?? child.name.en?.given}</span>
          </Container>
        </Button>
      ))}
    </ConstrainedContainer>
  );
};
