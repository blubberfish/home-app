export type FontFamilyProps = {
  font?: string;
};

export type FontSizeProps = {
  size?: number | string;
};

export type FontStyleProps = {
  weight?: number | string;
  wrap?: boolean;
  truncate?: boolean;
};

export type TypographyProps = FontFamilyProps & FontSizeProps & FontStyleProps;
