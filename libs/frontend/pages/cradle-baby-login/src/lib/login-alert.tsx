import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  color,
  ColorProps,
  font,
  FontProps,
  grid,
  GridProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { alertSelector } from './redux';

const Container = styled.section<
  ColorProps & GridProps & MarginProps & PaddingProps & RadiusProps
>`
  ${color}
  ${grid}
  ${margin}
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
  white-space: wrap;
  ${color}
  ${font}
`;

export const LoginAlert = () => {
  const alert = useSelector(alertSelector);
  return alert ? (
    <Container
      bg="error_accent"
      fg="error"
      pad={3}
      rad={3}
      gap={2}
      templateRows="repeat(2, min-content)"
      templateColumns="max-content"
    >
      <Title ftSize={2} ftWeight={3}>
        {alert.title}
      </Title>
      <Message ftSize={1} ftWeight={1} fg="dimgray">
        {alert.message}
      </Message>
    </Container>
  ) : null;
};
