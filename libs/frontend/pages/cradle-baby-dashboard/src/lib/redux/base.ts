import {
  Baby,
  Gear,
  PeopleRoof,
  Timeline,
} from '@blubberfish/frontend/components/icons/font-awesome';
import { ComponentType, SVGProps } from 'react';
import { PATH } from '../routes';

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
    { label: 'Overview', path: PATH.FAMILY, icon: PeopleRoof },
    { label: 'Activities', path: PATH.ACTIVITIES, icon: Baby },
    { label: 'History', path: PATH.HISTORY, icon: Timeline },
    { label: 'Settings', path: PATH.SETTINGS, icon: Gear },
  ],
});
