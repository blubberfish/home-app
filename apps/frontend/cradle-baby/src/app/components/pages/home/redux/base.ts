export const name = 'home_page' as const;

export type HomePageState = {
  menu: boolean;
};

export const getInitialState = (): HomePageState => ({
  menu: false,
});
