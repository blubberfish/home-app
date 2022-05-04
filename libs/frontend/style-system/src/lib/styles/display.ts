import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';

export type DisplayProps = {
  disp?: string;
};

export const display = <Props extends DisplayProps>({
  disp,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  disp &&
    styles.push(
      css`
        display: ${disp};
      `
    );
  return styles;
};
