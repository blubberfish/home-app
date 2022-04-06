import {
  alignment,
  AlignmentProps,
  color,
  ColorProps,
  font,
  FontProps,
  grid,
  GridProps,
  gridPos,
  GridPositionProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { PersonEntityPayload } from '@blubberfish/types';
import { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  from {
    opacity: 0.81;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div<
  AlignmentProps &
    ColorProps &
    FontProps &
    GridProps &
    GridPositionProps &
    PaddingProps &
    RadiusProps &
    SizeProps
>`
  ${alignment}
  ${color}
  ${font}
  ${grid}
  ${gridPos}
  ${padding}
  ${radius}
  ${size}
`;

const Label = styled.p<ColorProps & FontProps & SizeProps>`
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${color}
  ${font}
  ${size}
`;

const ContainerWithAnimation = styled(Container)`
  animation-name: ${pulseAnimation};
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

export type PersonSkeletonProps = {
  data?: PersonEntityPayload;
  onClick?: () => void;
};

export const PersonSkeleton = ({ data, onClick }: PersonSkeletonProps) => {
  const name = useMemo(
    () =>
      data
        ? data.name.en?.preferred ??
          `${data.name.en?.family} ${data.name.en?.given}`
        : null,
    [data]
  );
  const initials = useMemo(
    () =>
      name
        ?.split(' ')
        .slice(0, 1)
        .map((word) => word[0])
        .join('') ?? null,
    [name]
  );
  return (
    <Container
      justifyContent="center"
      templateRows="repeat(2, min-content)"
      templateColumns="max-content"
      gap={1}
      onClick={onClick}
    >
      {!data ? (
        <>
          <ContainerWithAnimation
            bg="background_invert"
            rad="50%"
            gridCol={1}
            gridColSpan={2}
            gridRow={1}
            h="48px"
            w="48px"
          />
          <ContainerWithAnimation
            bg="background_invert"
            ftSize={1}
            rad={1}
            h="1em"
            w="3em"
          />
        </>
      ) : (
        <>
          <Container
            bg="background_weak"
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            templateColumns="max-content"
            templateRows="max-content"
            rad="50%"
            h="48px"
            w="48px"
          >
            {initials}
          </Container>
          <Label ftSize={1} ftAlign="center" w="4em" overflow="hidden">
            {data.name.en?.preferred ??
              `${data.name.en?.family} ${data.name.en?.given}`}
          </Label>
        </>
      )}
    </Container>
  );
};
