import { ConstrainedLayout } from '@blubberfish/frontend/ui/components';
import { accountInfoSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  AlignmentProps,
  alignment,
  ColorProps,
  color,
  FontProps,
  font,
  GridProps,
  grid,
  PaddingProps,
  padding,
  RadiusProps,
  radius,
  SizeProps,
  size,
} from '@blubberfish/style-system';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ListSkeleton } from './dashboard-family-skeleton';

const Container = styled.div<
  AlignmentProps & GridProps & PaddingProps & RadiusProps & SizeProps
>`
  ${alignment}
  ${grid}
  ${padding}
  ${radius}
  ${size}
`;

const ConstrainedContainer = styled(ConstrainedLayout)<
  AlignmentProps & ColorProps & GridProps & PaddingProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${padding}
`;

const Text = styled.p<ColorProps & FontProps>`
  margin: 0;
  svg {
    fill: currentColor;
    height: 1em;
    width: 1em;
  }
  ${color}
  ${font}
`;

export const DashboardFamilyOverview = () => {
  const account = useSelector(accountInfoSelector);
  return (
    <ConstrainedContainer gap={5} pad={3}>
      {account?.family.parents.length ? (
        <Container
          gap={3}
          pad={3}
          rad={3}
          justifyItems="center"
          templateColumns="1fr"
        >
          <Text>Our adults</Text>
          <ListSkeleton persons={account.family.parents} />
        </Container>
      ) : null}
      <Container
        gap={3}
        pad={3}
        rad={3}
        justifyItems="center"
        templateColumns="1fr"
      >
        <Text>Our children</Text>
        <ListSkeleton persons={account?.family.children} />
      </Container>
    </ConstrainedContainer>
  );
};
