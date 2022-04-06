import { accountInfoSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  font,
  FontProps,
  responsive,
  ResponsiveProps,
  radius,
  RadiusProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const skeletonAnimation = keyframes`
  from {
    opacity: 0.67;
  }
  to {
    opacity: 1;
  }
`;

const Shape = styled.span<RadiusProps & SizeProps>`
  animation-name: ${skeletonAnimation};
  animation-duration: 1s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  background-color: currentColor;
  display: block;
  ${radius}
  ${size}
`;

const responsiveMenuButton = responsive<FontProps>(font);
const Title = styled.h1<ResponsiveProps<FontProps>>`
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${responsiveMenuButton}
`;

export const DashboardLayoutTitle = () => {
  const info = useSelector(accountInfoSelector);
  return (
    <Title responsive={[{ ftSize: 2 }, { ftSize: 3 }]}>
      {info ? (
        `${info.displayName}'s family`
      ) : (
        <Shape h="1em" w="5em" rad={1} />
      )}
    </Title>
  );
};
