export const name = 'login_page' as const;

export type LoginPageState = {
  menu: boolean;
};

export const getInitialState = (): LoginPageState => ({
  menu: false,
});
