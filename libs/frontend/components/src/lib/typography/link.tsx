import styled from 'styled-components';
import { indication } from '../theme/helpers';
import { IndicationProps } from '../../types';
import { Text, TextProps } from './text';

const A = styled.a<IndicationProps>`
  color: inherit;
  text-decoration: none;
  ${indication}
`;

A.defaultProps = {
  indication: {
    opacity: {
      disabled: 0.67,
      hover: 0.81,
    },
  },
};

export type LinkProps = { href?: string } & IndicationProps & TextProps;

export const Link = ({ href, indication, ...rest }: LinkProps) => {
  return (
    <A href={href}>
      <Text {...rest} />
    </A>
  );
};
