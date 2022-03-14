import { ReactNode, useMemo } from 'react';
import { BaseText } from './base';
import { ColorProps, FontSizeProps, FontStyleProps } from '../../types';

export type TextProps = ColorProps &
  FontSizeProps &
  Pick<FontStyleProps, 'weight' | 'wrap' | 'truncate'> & {
    italics?: boolean;
    underline?: boolean;
    children: string;
  };

export const Text = ({ children, italics, underline, ...rest }: TextProps) => {
  const content = useMemo(() => {
    let child: ReactNode = children;
    if (italics) {
      child = <i>{child}</i>;
    }
    if (underline) {
      child = <u>{child}</u>;
    }
    return child;
  }, [children, italics, underline]);

  return <BaseText {...rest}>{content}</BaseText>;
};
