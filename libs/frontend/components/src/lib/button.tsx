import { HTMLAttributes, ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import {
  alignContent,
  alignItems,
  alignSelf,
  justifyContent,
  justifyItems,
  justifySelf,
  border,
  color,
  grid,
  layout,
  position,
  space,
  variant,
  AlignContentProps,
  AlignItemsProps,
  AlignSelfProps,
  JustifyContentProps,
  JustifyItemsProps,
  JustifySelfProps,
  BorderProps,
  ColorProps,
  GridProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from 'styled-system';

export enum ButtonVariant {
  Default = 'default',
}

type ButtonStyleSystemProps = AlignSelfProps &
  JustifySelfProps &
  BorderProps &
  ColorProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  AlignContentProps &
  AlignItemsProps &
  JustifyContentProps &
  JustifyItemsProps & { variant?: ButtonVariant };

type BaseButtonProps = HTMLAttributes<HTMLButtonElement> &
  ButtonStyleSystemProps;

const BaseButton = styled.button<ButtonStyleSystemProps>(
  {
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
  },
  alignSelf,
  justifySelf,
  alignContent,
  alignItems,
  justifyContent,
  justifyItems,
  border,
  color,
  grid,
  layout,
  position,
  space,
  variant({
    prop: 'variant',
    scale: 'buttons',
    variants: {},
  })
);

BaseButton.defaultProps = {
  bg: 'transparent',
  color: 'text',
} as BaseButtonProps;

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  label?: ReactNode;
  reverse?: boolean;
};

export const Button = ({ icon, label, reverse, ...rest }: ButtonProps) => {
  const gridColumns = useMemo(() => {
    if (!(icon && label)) {
      return 'max-content';
    }

    return 'repeat(2, max-content)';
  }, [icon, label]);
  const content = useMemo(
    () =>
      !reverse ? (
        <>
          <div>{icon}</div>
          <div>{label}</div>
        </>
      ) : (
        <>
          <div>{label}</div>
          <div>{icon}</div>
        </>
      ),
    [icon, label, reverse]
  );
  return (
    <BaseButton
      display="grid"
      gridTemplateRows='min-content'
      gridTemplateColumns={gridColumns}
      type="button"
      {...rest}
    >
      {content}
    </BaseButton>
  );
};
