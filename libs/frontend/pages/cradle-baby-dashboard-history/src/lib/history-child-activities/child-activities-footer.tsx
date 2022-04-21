import {
  alignment,
  AlignmentProps,
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
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Button = styled.button`
  padding: 0;
  margin: 0;
  outline: 0;
  border: 0;
  border-radius: 0;
  background: none;
`

const responsiveContainer = responsive<FontProps>(font);
const Container = styled.div<
  AlignmentProps &
  ColorProps &
  GridProps &
  PaddingProps &
  RadiusProps &
  ResponsiveProps<FontProps>
  >`
  ${alignment}
  ${color}
  ${grid}
  ${padding}
  ${radius}
  ${responsiveContainer}
`;

export const ChildActivitiesFooter = () => {
  const navigate = useNavigate()
  const showList = useCallback(() => { navigate(`.?display=list`) }, [navigate])
  const showGrid = useCallback(() => { navigate(`.?display=grid`) }, [navigate])

  return (
    <Container
      alignItems="center"
      justifyContent="center"
      bg="background_weak"
      gap={2}
      pad={2}
      rad={2}
      templateRows="min-content"
      autoColumns="max-content"
      autoFlow="column"
      responsive={[{ ftSize: 1 }, { ftSize: 2 }]}
    >
      <Button type="button" onClick={showList}>
        <Container padX={2} padY={1} fg='text'>List</Container>
      </Button>
      <Button type="button" onClick={showGrid}>
        <Container padX={2} padY={1} fg='text'>Grid</Container>
      </Button>
    </Container>
  );
};
