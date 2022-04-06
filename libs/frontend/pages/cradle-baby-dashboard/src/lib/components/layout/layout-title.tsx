import { accountInfoSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  font,
  FontProps,
  responsive,
  ResponsiveProps,
} from '@blubberfish/style-system';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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
      {info?.displayName ? `${info?.displayName}'s` : 'My'} family
    </Title>
  );
};
