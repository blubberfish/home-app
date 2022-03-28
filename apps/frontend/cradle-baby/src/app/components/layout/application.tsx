import { PropsWithChildren } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  MarginProps,
  margin,
  color,
  ColorProps,
} from '@blubberfish/style-system';
import { ConstrainedLayout } from './constrained';

const GlobalStyle = createGlobalStyle<ColorProps & MarginProps>`
  ${color}
  ${margin}
`;

const Container = styled.div<{ justify?: string; headless?: boolean }>`
  min-height: 100vh;
  width: 100%;
  display: grid;
  template-columns: 1fr;
  template-rows: ${({ headless }) => (headless ? '1fr' : 'min-content 1fr')};
  auto-rows: 1fr;
  auto-flow: row;

  header {
    display: grid;
    auto-flow: column;
    auto-columns: max-content
    template-rows: min-content;
    ${({ justify }) => (justify ? ` justify-items: ${justify};` : null)}
  }
`;

export type ApplicationLayoutProps = PropsWithChildren<{
  head?: { left?: JSX.Element; right?: JSX.Element };
}>;

export const ApplicationLayout = ({
  children,
  head,
}: ApplicationLayoutProps) => (
  <Container
    headless={!head}
    justify={head && head.right && !head.left ? 'end' : 'space-between'}
  >
    <GlobalStyle />
    {head && (
      <ConstrainedLayout>
        {head.left}
        {head.right}
      </ConstrainedLayout>
    )}
    {children}
  </Container>
);
