import {
  Baby,
  Gear,
  PeopleRoof,
  Timeline,
} from '@blubberfish/frontend/components/icons/font-awesome';
import { DASHBOARD_PATH } from '@blubberfish/frontend/pages/cradle-baby-routes';
import { ComponentType, SVGProps } from 'react';

export const name = 'dashboard';

export type NavItem = {
  label: string;
  path: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type DashboardPageState = {
  navItems: NavItem[];
  menu?: boolean | null;
};

export const getInitialState = (): DashboardPageState => ({
  menu: null,
  navItems: [
    { label: 'Overview', path: DASHBOARD_PATH.FAMILY, icon: PeopleRoof },
    { label: 'Activities', path: DASHBOARD_PATH.ACTIVITIES, icon: Baby },
    { label: 'History', path: DASHBOARD_PATH.HISTORY, icon: Timeline },
    { label: 'Settings', path: DASHBOARD_PATH.SETTINGS, icon: Gear },
  ],
});
