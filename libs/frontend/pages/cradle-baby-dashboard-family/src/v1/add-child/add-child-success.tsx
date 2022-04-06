import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesome } from '@blubberfish/frontend/ui/components';
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
import {
  PATH,
  DASHBOARD_PATH,
} from '@blubberfish/frontend/pages/cradle-baby-routes';

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

  svg {
    fill: currentColor;
    height: 1em;
    width: 1em;
  }
`;

const Message = styled.p<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;

const Anchor = styled.a<ColorProps & FontProps>`
  ${color}
  ${font}
`;

export const AddChildSuccess = () => {
  const [searchParams] = useSearchParams();

  if (!searchParams.has('success')) return null;
  return (
    <Container
      bg="success_accent"
      fg="success"
      justifyContent="center"
      justifyItems="center"
      gap={3}
      pad={5}
      rad={3}
      templateColumns="max-content"
      templateRows="repeat(3, min-content)"
    >
      <Title ftSize={5}>
        <FontAwesome.CircleCheck />
      </Title>
      <Message fg="text_invert_weak" ftWeight={1}>
        Your child was added to the family!
      </Message>
      <Anchor
        fg="text_invert_strong"
        ftWeight={3}
        href={`/${PATH.DASHBOARD}/${DASHBOARD_PATH.FAMILY}`}
      >
        Back to your family
      </Anchor>
    </Container>
  );
};
