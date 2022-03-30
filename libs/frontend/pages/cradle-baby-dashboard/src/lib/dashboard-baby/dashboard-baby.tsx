import { Module } from '@blubberfish/frontend/modules/core'
import { grid, GridProps, } from '@blubberfish/style-system'
import styled from 'styled-components'
import { DashboardBabyActions } from './dashboard-baby-actions'
import { DashboardBabyList } from './dashboard-baby-list'
import slice from './redux'


const Container = styled.div<
  GridProps
  >`
  ${grid}
`;

const DashboardBabyPage = () => (
  <Container gap={3}>
    <DashboardBabyList />
    <DashboardBabyActions />
  </Container>
)

export default () => <Module slice={slice}><DashboardBabyPage /></Module>