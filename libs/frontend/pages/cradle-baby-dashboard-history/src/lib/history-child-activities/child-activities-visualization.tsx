import { accountIdSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  alignment,
  AlignmentProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
  responsive,
  ResponsiveProps,
  size,
  SizeProps,
} from '@blubberfish/style-system';
import { Fragment, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Cell } from './components/cell';
import { CellGrid } from './components/grid';
import { useChild, useLast3Days, useNormalizedActivities } from './hooks';
import { activityLogThunk } from './redux';

const responsiveContainer = responsive<AlignmentProps>(alignment);
const Container = styled.div<
  AlignmentProps &
    GridProps &
    PaddingProps &
    ResponsiveProps<AlignmentProps> &
    SizeProps
>`
  ${alignment}
  ${grid}
  ${padding}
  ${responsiveContainer}
  ${size}
`;

export const ChildActivitiesVisualization = () => {
  const dispatch = useDispatch();
  const account = useSelector(accountIdSelector);
  const baby = useChild();
  const days = useLast3Days();
  const activityMap = useNormalizedActivities();
  const activityList = useMemo(
    () =>
      days.map(
        (day) => activityMap[day.year()]?.[day.month()]?.[day.date()] ?? []
      ),
    [activityMap, days]
  );

  useEffect(() => {
    account && baby && dispatch(activityLogThunk({ account, baby: baby.uuid }));
  }, [dispatch, account, baby]);

  return (
    <Container
      justifyItems="center"
      templateColumns="1fr"
      templateRows="1fr"
      responsive={[{ alignItems: 'center' }, { alignItems: 'start' }]}
      overflow="auto"
    >
      <CellGrid>
        {activityList.map((activties, i) => (
          <Fragment key={i}>
            {new Array(24).fill(0).map((hr, i) => (
              <Cell
                key={hr + i}
                activities={(activties?.[hr + i] ?? []).map(
                  ({ activity }) => activity
                )}
              />
            ))}
          </Fragment>
        ))}
      </CellGrid>
    </Container>
  );
};
