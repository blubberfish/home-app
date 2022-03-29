export const name = 'register_page';

export type RegisterPageState = {
  successful?: boolean | null;
  alert?: {
    title: string;
    message: string;
  } | null;
};

export const getInitialState = (): RegisterPageState => ({
  alert: null,
  successful: null,
});
