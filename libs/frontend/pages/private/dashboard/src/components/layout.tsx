import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  BaseButton,
  Grid,
  Feather,
} from '@blubberfish/frontend/ui/components';

export type DashboardLinks = {
  label: string;
  path: string;
};

export type LayoutProps = {
  links: DashboardLinks[];
};

export const Layout = ({ links }: LayoutProps) => {
  const navigate = useNavigate();
  return (
    <Grid
      bg="gainsboro"
      grid={{
        templateColumns: 'max-content 1fr',
        templateRows: 'min-content 1fr min-content',
      }}
      w="100%"
      h="100vh"
    >
      <Grid
        bg="white"
        column={{ index: 1, span: 2 }}
        row={{ index: 1 }}
        grid={{
          templateColumns: '1fr',
          templateRows: 'min-content',
          justifyItems: 'end',
        }}
      >
        <BaseButton bg="gainsboro" radius={{ all: 0 }}>
          <Feather.X />
        </BaseButton>
      </Grid>
      <Grid
        bg="white"
        column={{ index: 1 }}
        row={{ index: 2 }}
        grid={{
          templateColumns: '1fr',
          autoRows: 'min-content',
          autoFlow: 'row',
        }}
      >
        {links.map((item, i) => (
          <BaseButton
            key={i}
            bg="gainsboro"
            onClick={() => navigate(item.path ?? '/')}
            radius={{ all: 0 }}
          >
            {item.label}
          </BaseButton>
        ))}
      </Grid>
      <Box column={{ index: 2 }} row={{ index: 2 }}>
        <Outlet />
      </Box>
      <Grid column={{ index: 1, span: 2 }} row={{ index: 3 }}></Grid>
    </Grid>
  );
};
