import styled from 'styled-components';
import { Text, TextProps } from './text';

const A = styled.a`
  color: inherit;
  text-decoration: none;
`;

export type LinkProps = { href?: string } & TextProps;

export const Link = ({ href, ...rest }: LinkProps) => {
  return (
    <A href={href}>
      <Text {...rest} />
    </A>
  );
};
