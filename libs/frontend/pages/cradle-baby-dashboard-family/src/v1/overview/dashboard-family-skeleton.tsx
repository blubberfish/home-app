import { Button, FontAwesome } from '@blubberfish/frontend/ui/components';
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
  PositionProps,
  position,
  RadiusProps,
  radius,
  SizeProps,
  size,
} from '@blubberfish/style-system';
import { PersonEntity } from '@blubberfish/types';
import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  from {
    opacity: 0.34;
  }
  to {
    opacity: 0.81;
  }
`;

const Text = styled.p<ColorProps & FontProps & SizeProps>`
  margin: 0;
  ${color}
  ${font}
  ${size}
`;

const Shape = styled.div<ColorProps & RadiusProps & SizeProps>`
  background-color: #fff8;
  animation-name: ${fadeInOut};
  animation-duration: 1s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  ${color}
  ${radius}
  ${size}
`;

const Container = styled.div<
  AlignmentProps &
    BorderProps &
    ColorProps &
    GridProps &
    PaddingProps &
    PositionProps &
    RadiusProps &
    SizeProps
>`
  svg {
    fill: currentColor;
  }
  ${alignment}
  ${border}
  ${color}
  ${grid}
  ${padding}
  ${position}
  ${radius}
  ${size}
`;

export type PersonSkeletonProps = {
  data?: PersonEntity;
  disabled?: boolean;
  onDelete?: () => void;
};
export const PersonSkeleton = ({
  data,
  disabled,
  onDelete,
}: PersonSkeletonProps) => (
  <Container
    overflow="hidden"
    alignContent="center"
    alignItems="center"
    justifyContent="center"
    justifyItems="center"
    templateColumns="max-content 1fr max-content"
    templateRows="1fr"
    bg="background_weak"
    gap={2}
    pad={2}
    rad={2}
  >
    {(data?.gender && (
      <Container
        h="64px"
        w="64px"
        templateColumns="max-content"
        templateRows="max-content"
        alignContent="center"
        justifyContent="center"
      >
        {data.gender === 'm' ? (
          <FontAwesome.Mars width="2em" height="2em" />
        ) : (
          <FontAwesome.Venus width="2em" height="2em" />
        )}
      </Container>
    )) ?? <Shape w="64px" h="64px" rad="50%" />}
    <Container templateColumns="1fr" templateRows="repeat(3, 1fr)" gap={2}>
      {(data && (
        <>
          <Text wMin="8em">
            {data.name.en?.family}&nbsp;
            {data.name.en?.given}
          </Text>
          <Text wMin="8em">
            {data.name.zh?.family}
            {data.name.zh?.given}
          </Text>
          <Text wMin="8em">
            {data.dtob.getDate().toString().padStart(2, '0')}/
            {(data.dtob.getMonth() + 1).toString().padStart(2, '0')}/
            {data.dtob.getFullYear()}
          </Text>
        </>
      )) ?? (
        <>
          <Shape fg="currentColor" h="1em" w="8em" />
          <Shape fg="currentColor" h="1em" w="8em" />
          <Shape fg="currentColor" h="1em" w="8em" />
        </>
      )}
    </Container>
    {(data && (
      <Button disabled={disabled} fg="error" simple onClick={onDelete}>
        <FontAwesome.Trash />
      </Button>
    )) ?? <Shape w="2em" h="2em" rad="50%" />}
  </Container>
);

export type ListSkeletonProps = {
  disabled?: boolean;
  persons?: PersonEntity[];
  onDelete?: (uuid: string) => void;
};
export const ListSkeleton = ({
  disabled,
  persons,
  onDelete,
}: ListSkeletonProps) => (
  <Container
    autoFlow="dense"
    autoColumns="max-content"
    autoRows="min-content"
    justifyContent="center"
    gap={3}
  >
    {persons ? (
      persons.map((person) => (
        <PersonSkeleton
          key={person.uuid}
          data={person}
          disabled={disabled}
          onDelete={() => {
            onDelete && onDelete(person.uuid);
          }}
        />
      ))
    ) : (
      <>
        <PersonSkeleton />
        <PersonSkeleton />
        <PersonSkeleton />
      </>
    )}
  </Container>
);
