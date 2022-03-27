import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';

export type AlignmentProps = {
  alignContent?: string;
  alignItems?: string;
  alignSelf?: string;
  justifyContent?: string;
  justifyItems?: string;
  justifySelf?: string;
};

export const alignment = <Props extends AlignmentProps>({
  theme,
  alignContent,
  alignItems,
  alignSelf,
  justifyContent,
  justifyItems,
  justifySelf,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];

  alignContent &&
    styles.push(
      css`
        align-content: ${alignContent};
      `
    );
  alignItems &&
    styles.push(
      css`
        align-items: ${alignItems};
      `
    );
  alignSelf &&
    styles.push(
      css`
        align-self: ${alignSelf};
      `
    );

  justifyContent &&
    styles.push(
      css`
        justify-content: ${justifyContent};
      `
    );
  justifyItems &&
    styles.push(
      css`
        justify-items: ${justifyItems};
      `
    );
  justifySelf &&
    styles.push(
      css`
        justify-self: ${justifySelf};
      `
    );

  return styles;
};
