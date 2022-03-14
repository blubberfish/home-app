export enum EdgeCorner {
  topLeft = 'top-left',
  topRight = 'top-right',
  bottomLeft = 'bottom-left',
  bottomRight = 'bottom-right',
}

export type RadiusProps = {
  radius?: {
    all?: number | string;
    b?: number | string;
    l?: number | string;
    r?: number | string;
    t?: number | string;
    tr?: number | string;
    tl?: number | string;
    br?: number | string;
    bl?: number | string;
  };
};

export type BorderStyleProps = {
  size?: number | string;
  style?: 'dotted' | 'solid';
  color?: number | string;
};

export type BorderProps = {
  border?: {
    all?: BorderStyleProps;
    x?: BorderStyleProps;
    y?: BorderStyleProps;
    l?: BorderStyleProps;
    r?: BorderStyleProps;
    t?: BorderStyleProps;
    b?: BorderStyleProps;
  };
};
