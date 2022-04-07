import {
  Filter,
  X,
  CircleCheck,
} from '@blubberfish/frontend/components/icons/font-awesome';
import {
  alignment,
  AlignmentProps,
  border,
  BorderProps,
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
  responsive,
  ResponsiveProps,
} from '@blubberfish/style-system';
import { BabyActivityType } from '@blubberfish/types';
import { ComponentType, SVGProps } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { filterSelector, toggleFilter } from './redux';

const StyledCircleCheck = styled(CircleCheck)<ColorProps>`
  fill: currentColor;
  ${color}
`;
const StyledX = styled(X)<ColorProps>`
  fill: currentColor;
  ${color}
`;

const Button = styled.button<
  AlignmentProps &
    BorderProps &
    ColorProps &
    GridProps &
    PaddingProps &
    RadiusProps
>`
  border: 0;
  border-radius: 0;
  background-color: transparent;
  color: currentColor;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: min-content;
  p {
    margin: 0;
  }
  svg {
    height: 1em;
    width: 1em;
    fill: currentColor;
  }
  ${alignment}
  ${border}
  ${color}
  ${grid}
  ${padding}
  ${radius}
`;

const responsiveContainer = responsive<FontProps>(font);
const Container = styled.div<
  AlignmentProps &
    ColorProps &
    GridProps &
    PaddingProps &
    RadiusProps &
    ResponsiveProps<FontProps>
>`
  svg {
    height: 1em;
    width: 1em;
    fill: currentColor;
  }
  ${alignment}
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${responsiveContainer}
`;

const filterLabel: { [key in BabyActivityType]: string } = {
  'baby:activity:feed': 'Feeding',
  'baby:activity:nurse': 'Nurse',
  'baby:activity:sleep': 'Sleeping',
  'baby:activity:wake': 'Wake up',
};

export const ChildActivitiesFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(filterSelector);
  return (
    <Container
      alignItems="center"
      justifyContent="space-evenly"
      gap={3}
      templateRows="min-content"
      templateColumns="max-content 1fr"
      autoFlow="column"
      responsive={[{ ftSize: 1 }, { ftSize: 2 }]}
    >
      <Filter />
      <Container
        alignItems="center"
        justifyContent="space-evenly"
        bg="background_weak"
        gap={2}
        pad={2}
        rad={2}
        templateRows="min-content"
        autoColumns="max-content"
        autoFlow="column"
        responsive={[{ ftSize: 1 }, { ftSize: 2 }]}
      >
        {Object.keys(filters).map((key) => (
          <Button
            key={key}
            alignItems="center"
            alignContent="center"
            gap={1}
            pad={1}
            rad={1}
            onClick={() => {
              dispatch(toggleFilter(key as BabyActivityType));
            }}
          >
            {filters[key as BabyActivityType] ? (
              <StyledCircleCheck fg="success" />
            ) : (
              <StyledX fg="error" />
            )}
            <p>{filterLabel[key as BabyActivityType]}</p>
          </Button>
        ))}
      </Container>
    </Container>
  );
};
