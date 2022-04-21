import {
  alignment,
  AlignmentProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChildActivitiesFilter } from './child-activities-filter';
import { ChildActivitiesHeader } from './child-activities-header';
import { ChildActivitiesFooter } from './child-activities-footer';
import { ChildActivitiesList } from './child-activities-list';
import { ChildActivitiesVisualization } from './child-activities-visualization';
import { useChild } from './hooks';

const Container = styled.div<
  AlignmentProps & GridProps & PaddingProps & SizeProps
  >`
  ${alignment}
  ${grid}
  ${padding}
  ${size}
`;

const ChildHistoryPage = () => {
  const baby = useChild();
  if (!baby) {
    return <Navigate to=".." />;
  }
  return (
    <Container
      templateColumns="1fr"
      templateRows="min-content 1fr min-content"
      gap={2}
      padB={3}
      overflow="auto"
    >
      <ChildActivitiesHeader />
      <ChildActivitiesVisualization />
      <ChildActivitiesList />
      <ChildActivitiesFilter />
      <ChildActivitiesFooter />
    </Container>
  );
};

export default ChildHistoryPage;
