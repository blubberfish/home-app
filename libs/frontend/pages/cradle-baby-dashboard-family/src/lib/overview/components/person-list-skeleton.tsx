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
  responsive,
  ResponsiveProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { PersonEntityPayload } from '@blubberfish/types';
import styled from 'styled-components';
import { PersonSkeleton } from './person-skeleton';

type ResponsiveGridProps = AlignmentProps & GridProps;
const responsiveGrid = responsive<ResponsiveGridProps>((props) => [
  ...alignment(props),
  ...grid(props),
]);

const Container = styled.div<
  ColorProps &
    GridProps &
    ResponsiveProps<ResponsiveGridProps> &
    PaddingProps &
    RadiusProps &
    SizeProps
>`
  ${color}
  ${grid}
  ${responsiveGrid}
  ${padding}
  ${radius}
  ${size}
`;

export type PersonSkeletonListProps = {
  data?: PersonEntityPayload[];
};

export const PersonListSkeleton = ({ data }: PersonSkeletonListProps) => {
  return (
    <Container
      gap={3}
      autoRows="min-content"
      responsive={[
        {
          justifyContent: 'space-evenly',
          templateColumns: 'repeat(3, max-content)',
        },
        {
          justifyContent: 'start',
          templateColumns: 'repeat(8, max-content)',
        },
      ]}
    >
      {data ? (
        data.map((entity) => <PersonSkeleton key={entity.uuid} data={entity} />)
      ) : (
        <>
          <PersonSkeleton />
          <PersonSkeleton />
          <PersonSkeleton />
        </>
      )}
    </Container>
  );
};
