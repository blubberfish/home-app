import {
  color,
  ColorProps,
  backgroundImage,
  BackgroundImageProps,
  border,
  BorderProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import styled from 'styled-components';

const Container = styled.div<
  BackgroundImageProps & PaddingProps & RadiusProps & SizeProps
>`
  ${backgroundImage}
  ${padding}
  ${radius}
  ${size}

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  filter: drop-shadow(0px 3px 3px #0003);
`;

const StyledForm = styled.form<ColorProps & RadiusProps>`
  ${color}
  ${radius}
`;

export const Form = () => {
  return (
    <Container
      bgImg="home"
      bgSize="cover"
      padT={2}
      padL={2}
      radTL={3}
      radTR={3}
      radBR={3}
      w="256px"
      h="256px"
      overflow="hidden"
    >
      <StyledForm bg="background" radTL={3} radBR={3} radTR={3}></StyledForm>
    </Container>
  );
};
