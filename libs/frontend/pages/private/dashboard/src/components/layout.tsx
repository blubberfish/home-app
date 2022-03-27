import { useNavigate, RouteProps, Route, Routes } from 'react-router-dom';
import {
  Box,
  BaseButton,
  Grid,
  Feather,
} from '@blubberfish/frontend/ui/components';

export type DashboardFeature = {
  label: string;
  props: RouteProps;
};

export type LayoutProps = {
  features: DashboardFeature[];
};

export const Layout = ({ features }: LayoutProps) => {
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
        {features.map((feature, i) => (
          <BaseButton
            key={i}
            bg="gainsboro"
            onClick={() => navigate(feature.props.path ?? '/')}
            radius={{ all: 0 }}
          >
            {feature.label}
          </BaseButton>
        ))}
      </Grid>
      <Box column={{ index: 2 }} row={{ index: 2 }}>
        <Routes>
          {features.map((feature, i) => <Route key={i} {...feature.props} />)}
        </Routes>
      </Box>
      <Grid column={{ index: 1, span: 2 }} row={{ index: 3 }}></Grid>
    </Grid>
  );
};
