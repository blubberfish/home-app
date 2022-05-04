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
  size,
  SizeProps,
} from '@blubberfish/style-system';
import moment from 'moment';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useChild } from './hooks';

const Shape = styled.div<ColorProps & RadiusProps & SizeProps>`
  ${color}
  ${radius}
  ${size}
`;

const P = styled.p`
  margin: 0;
`;

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

const Text = ({ value }: { value?: string | null }) =>
  value ? <P>{value}</P> : <Shape bg="currentColor" h="1em" w="5em" />;

export const LogHeader = () => {
  const child = useChild();
  const enName = useMemo(
    () =>
      child?.name.en?.preferred ??
      `${child?.name.en?.family} ${child?.name.en?.given}`,
    [child]
  );
  const zhName = useMemo(
    () =>
      child?.name.zh?.preferred ??
      `${child?.name.zh?.family}${child?.name.zh?.given}`,
    [child]
  );
  const dob = useMemo(
    () => (child ? moment(child.dtob).format('DD MMM YYYY (HH:mm)') : null),
    [child]
  );

  return (
    <Container
      alignItems="center"
      justifyContent="space-between"
      bg="background_weak"
      gap={2}
      pad={2}
      rad={2}
      templateRows="min-content"
      autoColumns="max-content"
      autoFlow="column"
      responsive={[
        { ftSize: 1 },
        { ftSize: 2 }
      ]}
    >
      <Text value={enName} />
      <Text value={zhName} />
      <Text value={dob} />
    </Container>
  );
};
