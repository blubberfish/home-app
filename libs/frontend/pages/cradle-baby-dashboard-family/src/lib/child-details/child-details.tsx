import {
  Mars,
  Venus,
} from '@blubberfish/frontend/components/icons/font-awesome';
import { selectChildById } from '@blubberfish/frontend/modules/cradle-baby/app';
import { DASHBOARD_FAMILY_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
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
  size,
  SizeProps,
} from '@blubberfish/style-system';
import moment from 'moment';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Shape = styled.div<ColorProps & RadiusProps & SizeProps>`
  ${color}
  ${radius}
  ${size}
`;

const Text = styled.p<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;

const TextSkeleton = ({
  text,
  ...props
}: { text?: string | null } & ColorProps & FontProps) =>
  text ? (
    <Text {...props}>{text}</Text>
  ) : (
    <Shape bg="text" h="1em" w="5em" rad={2} />
  );

const Container = styled.div<
  AlignmentProps & ColorProps & GridProps & PaddingProps & RadiusProps
  >`
  svg {
    height: 1.2em;
    width: 1.2em;
    fill: currentColor;
  }

  h1,
  p {
    margin: 0;
  }

  ${alignment}
  ${color}
  ${grid}
  ${padding}
  ${radius}
`;

export const ChildDetails = () => {
  const uuid = useParams()['id'];
  const child = useSelector(selectChildById(uuid));
  const displayName = useMemo(() => {
    if (!child) return null;
    return child.name.en?.preferred ?? child.name.en?.given;
  }, [child]);
  if (!child) return <Navigate to={`../${DASHBOARD_FAMILY_PATH.OVERVIEW}`} />;
  return (
    <Container
      templateColumns="1fr"
      autoRows="min-content"
      autoFlow="row"
      gap={3}
    >
      <TextSkeleton
        fg="text_weak"
        ftSize={4}
        text={displayName && `${displayName}'s details`}
      />
      <Container bg="background_weak" pad={2} rad={2}>
        <TextSkeleton ftSize={3} ftWeight={1} text="English name" />
        {child.name.en?.preferred && (
          <TextSkeleton ftSize={2} text={child.name.en?.preferred} />
        )}
        <TextSkeleton
          ftSize={2}
          text={child && `${child.name.en?.family} ${child.name.en?.given}`}
        />
      </Container>
      <Container bg="background_weak" pad={2} rad={2}>
        <TextSkeleton ftSize={3} ftWeight={1} text="Chinese name" />
        {child.name.zh?.preferred && (
          <TextSkeleton ftSize={2} text={child.name.zh?.preferred} />
        )}
        <TextSkeleton
          ftSize={2}
          text={child && `${child.name.zh?.family} ${child.name.zh?.given}`}
        />
      </Container>
      <Container bg="background_weak" pad={2} rad={2}>
        <TextSkeleton ftSize={3} ftWeight={1} text="Gender" />
        <section>{child.gender === 'm' ? <Mars /> : <Venus />}</section>
      </Container>
      <Container bg="background_weak" pad={2} rad={2}>
        <TextSkeleton ftSize={3} ftWeight={1} text="Date and time of birth" />
        <TextSkeleton
          ftSize={2}
          text={moment(child.dtob).format('DD MMM YYYY')}
        />
      </Container>
    </Container>
  );
};
