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
import { PersonEntity } from '@blubberfish/types';
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
  data?: PersonEntity[];
  onClick?: (uuid: string) => void;
};

export const PersonListSkeleton = ({
  data,
  onClick,
}: PersonSkeletonListProps) => {
  return (
    <Container
      gap={3}
      autoRows="min-content"
      responsive={[
        {
          justifyContent: 'start',
          templateColumns: `repeat(${Math.min(
            5,
            data?.length ?? 1
          )}, max-content)`,
        },
        {
          templateColumns: 'repeat(8, max-content)',
        },
      ]}
    >
      {data ? (
        data.map((entity) => (
          <PersonSkeleton
            key={entity.uuid}
            data={entity}
            onClick={() => {
              onClick && onClick(entity.uuid);
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
};
