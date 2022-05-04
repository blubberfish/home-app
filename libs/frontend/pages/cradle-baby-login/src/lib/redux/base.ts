export const name = 'login_page';

export type LoginPageState = {
  alert?: {
    title: string;
    message: string;
  } | null;
};

export const getInitialState = (): LoginPageState => ({
  alert: null,
});
