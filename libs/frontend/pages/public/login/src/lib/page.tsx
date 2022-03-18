import { Grid, CarouselDots } from '@blubberfish/frontend/components';

export const Page = () => {
  return (
    <Grid
      w="100%"
      minH="568px"
      grid={{ templateColumns: '1fr', templateRows: '1fr min-content' }}
    >
      <h1>LOGIN PAGE</h1>
      <Grid
        grid={{
          templateColumns: 'max-content',
          templateRows: 'min-content',
          justifyContent: 'center',
        }}
      >
        <CarouselDots
          count={8}
          duration={{ s: 5 }}
          layout={{ gap: 5, thickness: 5, size: 24 }}
        />
      </Grid>
    </Grid>
  );
};
