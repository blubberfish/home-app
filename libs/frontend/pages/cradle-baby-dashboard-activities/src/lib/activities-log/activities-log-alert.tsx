import {
  color,
  ColorProps,
  font,
  FontProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  position,
  PositionProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { alertSelector, dismissAlert } from './redux';

const Container = styled.div<
  ColorProps & GridProps & PaddingProps & PositionProps & RadiusProps
>`
  ${color}
  ${grid}
  ${padding}
  ${position}
  ${radius}
`;
const H1 = styled.h1<ColorProps & FontProps>`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${color}
  ${font}
`;
const P = styled.p<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;

export const LogAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector(alertSelector);
  if (!alert) return null;
  return (
    <Container
      bg={alert.type === 'success' ? 'success_accent' : 'error_accent'}
      fg="text_invert_weak"
      gap={1}
      pad={2}
      rad={2}
      pos="fixed"
      posX={1}
      posB={1}
      onClick={() => {
        dispatch(dismissAlert());
      }}
    >
      <H1 fg={alert.type === 'success' ? 'success' : 'error'} ftSize={2}>
        {alert.title}
      </H1>
      <P ftSize={1}>{alert.message}</P>
    </Container>
  );
};
