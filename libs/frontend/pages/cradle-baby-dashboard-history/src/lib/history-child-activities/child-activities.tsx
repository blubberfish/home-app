import {
  alignment,
  AlignmentProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
} from '@blubberfish/style-system';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChildActivitiesHeader } from './child-activities-header';
import { ChildActivitiesVisualization } from './child-activities-visualization';
import { useChild } from './hooks';

const Container = styled.div<AlignmentProps & GridProps & PaddingProps>`
  ${alignment}
  ${grid}
  ${padding}
`;

const ChildHistoryPage = () => {
  const baby = useChild();
  if (!baby) {
    return <Navigate to=".." />;
  }
  return (
    <Container templateColumns="1fr" templateRows="min-content 1fr" gap={2}>
      <ChildActivitiesHeader />
      <ChildActivitiesVisualization />
    </Container>
  );
};

export default ChildHistoryPage;
