import { Module } from '@blubberfish/frontend/modules/core';
import { accountIdSelector } from '@blubberfish/frontend/modules/cradle-baby/app';
import {
  alignment,
  AlignmentProps,
  grid,
  GridProps,
  padding,
  PaddingProps,
} from '@blubberfish/style-system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import slice, { activityLogThunk, currentBabySelector } from './redux';
import { DashboardActivitiesBabies } from './dashboard-activities-babies';
import { DashboardActivitiesGrid } from './dashboard-activities-grid';
import { DashboardActivitiesGridTitle } from './dashboard-activities-grid-title';
import { DashboardActivitiesLegend } from './dashboard-activities-legend';

const Container = styled.div<AlignmentProps & GridProps & PaddingProps>`
  ${alignment}
  ${grid}
  ${padding}
`;

const DashboardActivitiesPage = () => {
  const dispatch = useDispatch();
  const account = useSelector(accountIdSelector);
  const baby = useSelector(currentBabySelector);
  useEffect(() => {
    account &&
      baby &&
      dispatch(
        activityLogThunk({
          account,
          baby,
        })
      );
  }, [account, baby, dispatch]);
  return (
    <Container
      templateColumns="max-content"
      autoRows="min-content"
      autoFlow="row"
      justifyContent="center"
      justifyItems="center"
      gap={5}
      pad={3}
    >
      <DashboardActivitiesBabies />
      <Container
        templateColumns="max-content"
        autoRows="min-content"
        autoFlow="row"
        gap={3}
      >
        <DashboardActivitiesGridTitle />
        <Container
          alignItems="center"
          templateColumns="repeat(2, max-content)"
          templateRows="min-content"
          gap={2}
        >
          <DashboardActivitiesGrid />
          <DashboardActivitiesLegend />
        </Container>
      </Container>
    </Container>
  );
};

export default () => (
  <Module slice={slice}>
    <DashboardActivitiesPage />
  </Module>
);
