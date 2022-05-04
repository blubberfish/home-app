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
  margin,
  MarginProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { FontAwesome } from '@blubberfish/frontend/ui/components';
import { PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';

const Container = styled.section<
  AlignmentProps &
    ColorProps &
    GridProps &
    MarginProps &
    PaddingProps &
    RadiusProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${margin}
  ${padding}
  ${radius}
  
  svg {
    fill: currentColor;
  }
`;

const Message = styled.p<ColorProps & FontProps>`
  margin: 0;
  ${color}
  ${font}
`;

const Link = styled.a<ColorProps & FontProps>`
  ${color}
  ${font}
`;

export const RegisterSuccess = () => {
  return (
    <Container
      bg="success_accent"
      fg="success"
      pad={5}
      rad={5}
      gap={5}
      templateRows="repeat(2, min-content)"
      templateColumns="max-content"
      justifyContent="center"
      justifyItems="center"
    >
      <FontAwesome.CircleCheck width={64} height={64} />
      <Message ftSize={3} ftWeight={1} fg="dimgray">
        Your account have been created!
      </Message>
      <Link href={PATH.LOGIN} ftSize={2} ftWeight={4} fg="text_invert_strong">
        Proceed to login
      </Link>
    </Container>
  );
};
