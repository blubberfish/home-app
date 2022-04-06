import {
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
import styled from 'styled-components';
import { PersonListSkeleton } from './components/person-list-skeleton';

const Container = styled.div<
  ColorProps & GridProps & PaddingProps & RadiusProps & SizeProps
>`
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${size}
`;

export const Overview = () => {
  return (
    <Container
      templateColumns="1fr"
      autoRows="min-content"
      autoFlow="row"
      gap={3}
    >
      <PersonListSkeleton />
      <PersonListSkeleton />
      <PersonListSkeleton
        data={[
          {
            uuid: 'Test',
            dtob: 'test',
            gender: 'm',
            name: {
              en: { family: 'Chua', given: 'Ning Xi', preferred: 'Ezra' },
            },
          },
          {
            uuid: 'Test',
            dtob: 'test',
            gender: 'm',
            name: {
              en: { family: 'Chua', given: 'Ning Xi', preferred: 'Ezra' },
            },
          },
          {
            uuid: 'Test',
            dtob: 'test',
            gender: 'm',
            name: {
              en: { family: 'Chua', given: 'Ning Xi', preferred: 'Ezra' },
            },
          },
          {
            uuid: 'Test',
            dtob: 'test',
            gender: 'm',
            name: {
              en: { family: 'Chua', given: 'Ning Xi', preferred: 'Ezra' },
            },
          },
          {
            uuid: 'Test',
            dtob: 'test',
            gender: 'm',
            name: {
              en: { family: 'Chua', given: 'Ning Xi', preferred: 'Ezra' },
            },
          },
          {
            uuid: 'Test',
            dtob: 'test',
            gender: 'm',
            name: {
              en: {
                family: 'Chua',
                given: 'Ning Xi',
                preferred: 'Ezra super long name more than 10 characters',
              },
            },
          },
        ]}
      />
    </Container>
  );
};
