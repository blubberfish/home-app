import { useSelector } from 'react-redux';
import styled from 'styled-components';
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
} from '@blubberfish/style-system';
import { alertSelector } from './redux';

const Container = styled.div<
  AlignmentProps & ColorProps & GridProps & PaddingProps & RadiusProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${padding}
  ${radius}
`;

const Title = styled.h1<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;
const Message = styled.p<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;

export const AddChildAlert = () => {
  const alert = useSelector(alertSelector);

  if (!alert) return null;
  return (
    <Container bg="error_accent" fg="error" gap={2} pad={3} rad={3}>
      <Title ftSize={2}>{alert.title}</Title>
      <Message fg="text_invert_weak" ftSize={1}>
        {alert.message}
      </Message>
    </Container>
  );
};
