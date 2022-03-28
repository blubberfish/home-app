import {
  css,
  FlattenSimpleInterpolation,
  StyledProps,
} from 'styled-components';
import { defaultTheme, Theme } from '../theme';
import { resolve } from '../utils';

export type BackgroundImageProps = {
  isUrl?: boolean;
  bgImg?: string;
  bgAttachment?: string;
  bgPosition?: string;
  bgRepeat?: string;
  bgSize?: string;
};

export const backgroundImage = <Props extends BackgroundImageProps>({
  theme,
  isUrl,
  bgImg,
  bgAttachment,
  bgPosition,
  bgRepeat,
  bgSize,
}: StyledProps<Props>) => {
  const styles: FlattenSimpleInterpolation[] = [];
  const images = (theme as Theme)?.images ?? defaultTheme.images;

  bgImg &&
    styles.push(css`
      background-image: ${isUrl
        ? `url('${resolve(bgImg, images)})'`
        : resolve(bgImg, images)};
    `);

  bgAttachment &&
    styles.push(css`
      background-attachment: ${bgAttachment};
    `);

  bgPosition &&
    styles.push(css`
      background-position: ${bgPosition};
    `);

  bgRepeat &&
    styles.push(css`
      background-repeat: ${bgRepeat};
    `);

  bgSize &&
    styles.push(css`
      background-size: ${bgSize};
    `);

  return styles;
};
