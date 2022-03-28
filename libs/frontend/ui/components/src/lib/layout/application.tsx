import { PropsWithChildren } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  SizeProps,
  size,
  PaddingProps,
  padding,
  MarginProps,
  margin,
  GridProps,
  grid,
  FontProps,
  font,
  ColorProps,
  color,
  BackgroundImageProps,
  backgroundImage,
  AlignmentProps,
  alignment,
} from '@blubberfish/style-system';
import { ConstrainedLayout } from './constrained';

const HeaderContainer = styled.div<BackgroundImageProps & ColorProps>`
  ${backgroundImage}
  ${color}
`;

const StyledHeaderConstrainedLayout = styled(ConstrainedLayout)<
  PaddingProps & MarginProps & GridProps & ColorProps & AlignmentProps
>`
  ${padding}
  ${margin}
  ${grid}
  ${color}
  ${alignment}
`;

const GlobalStyle = createGlobalStyle<ColorProps & FontProps & MarginProps>`
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: sans-serif;
    ${color}
    ${font}
    ${margin}
  }
`;

const Container = styled.div<
  AlignmentProps & ColorProps & GridProps & SizeProps
>`
  ${alignment}
  ${color}
  ${grid}
  ${size}
`;

export type ApplicationLayoutProps = PropsWithChildren<{
  head?: {
    left?: JSX.Element;
    right?: JSX.Element;
    style?: BackgroundImageProps & ColorProps;
  };
}>;

export const ApplicationLayout = ({
  children,
  head,
}: ApplicationLayoutProps) => (
  <Container
    templateColumns="1fr"
    templateRows={head?.left || head?.right ? 'min-content' : '1fr'}
    autoRows="1fr"
    autoFlow="row"
    w="100%"
    hMin="100vh"
  >
    <GlobalStyle ft="sans-serif" ftSize={2} mar={0} bg="background" />
    {head && (
      <HeaderContainer
        bg="primary"
        fg="white"
        bgUrl="login-header"
        bgSize="cover"
      >
        <StyledHeaderConstrainedLayout
          justifyItems={
            head && head.right && !head.left ? 'end' : 'space-between'
          }
          marT={3}
          pad={3}
        >
          {head.left}
          {head.right}
        </StyledHeaderConstrainedLayout>
      </HeaderContainer>
    )}
    {children}
  </Container>
);
