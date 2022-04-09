import { CircleCheck } from '@blubberfish/frontend/components/icons/font-awesome';
import {
  PATH,
  DASHBOARD_PATH,
} from '@blubberfish/frontend/pages/cradle-baby-routes';
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
  position,
  PositionProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { alertSelector } from './redux';

const Container = styled.div<
  AlignmentProps &
  ColorProps &
  GridProps &
  PaddingProps &
  PositionProps &
  RadiusProps
  >`
  ${alignment}
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

const A = styled.a<ColorProps & FontProps>`
  color: currentColor;
  ${color}
  ${font}
`;

export const AddChildSuccess = () => {
  const alert = useSelector(alertSelector);
  if (!alert) return null;
  if (alert.type === 'error') return null;
  return (
    <Container
      bg="success_accent"
      fg="text_invert_weak"
      templateColumns="max-content"
      autoRows="min-content"
      autoFlow="row"
      justifyContent="center"
      justifyItems="center"
      gap={2}
      pad={2}
      rad={2}
    >
      <P fg="success">
        <CircleCheck fill="currentColor" height="64px" width="64px" />
      </P>
      <H1 fg="success" ftSize={3}>
        {alert.title}
      </H1>
      <P>{alert.message}</P>
      <A
        fg="text_weak"
        ftSize={1}
        ftWeight={3}
        href={`/${PATH.DASHBOARD}/${DASHBOARD_PATH.FAMILY}`}
      >
        View family details
      </A>
    </Container>
  );
};
