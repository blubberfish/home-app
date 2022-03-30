import { Module } from '@blubberfish/frontend/modules/core'
import { DashboardBabyList } from './dashboard-baby-list'
import slice from './redux'

const DashboardBabyPage = () => (
  <div>
    <DashboardBabyList />
  </div>
)

export default () => <Module slice={slice}><DashboardBabyPage /></Module>