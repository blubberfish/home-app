import { selectAllChildren } from '@blubberfish/frontend/modules/cradle-baby/app';
import { grid, GridProps } from '@blubberfish/style-system';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setBaby, currentBabySelector } from './redux';

const Container = styled.div<GridProps>`
  ${grid}
`;

export const DashboardActivitiesBabies = () => {
  const dispatch = useDispatch();
  const babies = useSelector(selectAllChildren);
  const baby = useSelector(currentBabySelector);
  return (
    <Container gap={3}>
      {babies.map(({ uuid, name }) => (
        <button
          key={uuid}
          type="button"
          onClick={() => {
            dispatch(setBaby(uuid));
          }}
        >
          {name.en?.preferred ?? name.en?.given}
          {baby === uuid && <span>Selected</span>}
        </button>
      ))}
    </Container>
  );
};
