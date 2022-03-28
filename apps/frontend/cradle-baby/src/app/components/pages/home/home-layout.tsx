import { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import {
  alignment,
  AlignmentProps,
  backgroundImage,
  BackgroundImageProps,
  border,
  BorderProps,
  color,
  ColorProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { useWindowSize } from '@blubberfish/frontend/hooks';

const RootContainer = styled.div<
  BackgroundImageProps & GridProps & PaddingProps & SizeProps
>`
  ${backgroundImage}
  ${padding}
  ${grid}
  ${size}
`;

const Container = styled.div<
  AlignmentProps &
    BorderProps &
    ColorProps &
    GridProps &
    PaddingProps &
    SizeProps
>`
  ${alignment}
  ${border}
  ${color}
  ${grid}
  ${padding}
  ${size}
`;

export type HomePageLayoutProps = {
  left?: ReactNode;
  right?: ReactNode;
};

export const HomePageLayout = ({ left, right }: HomePageLayoutProps) => {
  const { width } = useWindowSize();
  const isLarge = width > 737;
  const { templateRows, templateColumns, bdrR, bdrB } = useMemo(
    () =>
      isLarge
        ? {
            templateRows: '1fr',
            templateColumns: 'repeat(2, 1fr)',
            bdrR: { size: 1, color: '#fff1' },
          }
        : {
            templateRows: 'repeat(2, 1fr)',
            templateColumns: '1fr',
            bdrB: { size: 1, color: '#fff1' },
          },
    [isLarge]
  );

  return (
    <RootContainer
      w="100%"
      hMin="100vh"
      padB={5}
      bgUrl="home"
      bgPosition="center 256px"
      bgSize="cover"
      templateColumns="1fr"
      templateRows="1fr"
    >
      <Container
        bg="background_weak"
        templateColumns={templateColumns}
        templateRows={templateRows}
        pad={5}
      >
        <Container bdrR={bdrR} bdrB={bdrB}>
          {left}
        </Container>
        <Container>{right}</Container>
      </Container>
    </RootContainer>
  );
};
