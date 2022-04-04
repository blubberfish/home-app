import {
  alignment,
  AlignmentProps,
  border,
  BorderProps,
  color,
  ColorProps,
  font,
  FontProps,
  grid,
  GridProps,
  indication,
  IndicationType,
  opacity,
  OpacityProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
} from '@blubberfish/style-system';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BASE } from '../routes';

export type ButtonIndicationStyle = ColorProps & OpacityProps;
export type ButtonIndicationProps = {
  [IndicationType.Hover]?: ButtonIndicationStyle;
};

const hoverIndication = indication<ButtonIndicationProps>(
  IndicationType.Hover,
  [
    ({ hover, theme }) => (hover ? color({ ...hover, theme }) : null),
    ({ hover, theme }) => (hover ? opacity({ ...hover, theme }) : null),
  ]
);

export const Button = styled.button<
  ButtonIndicationProps &
    BorderProps &
    ColorProps &
    FontProps &
    PaddingProps &
    RadiusProps
>`
  background-color: transparent;
  color: currentColor;
  text-align: left;
  svg {
    fill: currentColor;
    height: 1.2em;
    width: 1.2em;
  }
  ${border}
  ${color}
  ${font}
  ${padding}
  ${radius}
  ${hoverIndication}
`;

const Container = styled.div<AlignmentProps & GridProps & PaddingProps>`
  ${alignment}
  ${grid}
  ${padding}
`;

export type NavLinkProps = {
  to: string;
  icon: JSX.Element;
  label: string;
};
export const NavLink = ({ icon, label, to }: NavLinkProps) => {
  const match = useMatch(`${BASE}/${to}`);
  const navigate = useNavigate();
  return (
    <Button
      bdr={{ size: 0 }}
      bg={match ? 'background_weak' : undefined}
      hover={{ bg: 'background_weak' }}
      onClick={() => {
        navigate(to);
      }}
      rad={3}
    >
      <Container
        gap={2}
        padX={3}
        padY={2}
        alignContent="center"
        templateRows="min-content"
        templateColumns="max-content 1fr"
      >
        {icon}
        <span>{label}</span>
      </Container>
    </Button>
  );
};

export type NavButtonProps = {
  onClick: () => void;
  icon: JSX.Element;
  label: string;
};
export const NavButton = ({ icon, label, onClick }: NavButtonProps) => (
  <Button
    bdr={{ size: 0 }}
    hover={{ bg: 'background_weak' }}
    onClick={onClick}
    rad={3}
  >
    <Container
      gap={2}
      padX={3}
      padY={2}
      alignContent="center"
      templateRows="min-content"
      templateColumns="max-content 1fr"
    >
      {icon}
      <span>{label}</span>
    </Container>
  </Button>
);
