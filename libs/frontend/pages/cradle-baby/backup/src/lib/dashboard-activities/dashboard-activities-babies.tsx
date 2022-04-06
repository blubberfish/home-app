import { selectAllChildren } from '@blubberfish/frontend/modules/cradle-baby/app';
import { Button, FontAwesome } from '@blubberfish/frontend/ui/components';
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
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { resetBaby, setBaby, clearDataSet, currentBabySelector } from './redux';

const Container = styled.div<AlignmentProps & GridProps>`
  ${alignment}
  ${grid}
`;

const ButtonContainer = styled(Container)<
  ColorProps & PaddingProps & RadiusProps & SizeProps
>`
  ${color}
  ${padding}
  ${radius}
  ${size}
`;

export const DashboardActivitiesBabies = () => {
  const dispatch = useDispatch();
  const babies = useSelector(selectAllChildren);
  const baby = useSelector(currentBabySelector);
  useEffect(() => {
    babies.length === 1 && dispatch(setBaby(babies[0].uuid));
  }, [babies, dispatch]);

  return (
    <Container
      justifyContent="center"
      justifyItems="center"
      templateRows="max-content"
      autoColumns="max-content"
      autoFlow="column"
      gap={3}
    >
      {babies.map(({ uuid, name }) =>
        !baby || (baby && baby === uuid) ? (
          <Button
            key={uuid}
            simple
            type="button"
            onClick={() => {
              dispatch(setBaby(uuid));
            }}
          >
            <ButtonContainer
              alignContent="center"
              alignItems="center"
              justifyContent="center"
              justifyItems="center"
              bg={baby === uuid ? 'success' : 'background_weak'}
              h="5em"
              w="5em"
              rad="50%"
            >
              {name.en?.preferred ?? name.en?.given}
            </ButtonContainer>
          </Button>
        ) : null
      )}
      {baby && (
        <Button
          simple
          type="button"
          onClick={() => {
            dispatch(resetBaby());
            dispatch(clearDataSet([]));
          }}
        >
          <ButtonContainer
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            bg="error"
            h="5em"
            w="5em"
            rad="50%"
          >
            <FontAwesome.X />
          </ButtonContainer>
        </Button>
      )}
    </Container>
  );
};
