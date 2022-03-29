export const name = 'app';

export const storage = {
  accountId: {
    get: () => localStorage.getItem('u'),
    set: (value?: string | null) => {
      if (!value) {
        localStorage.removeItem('u');
      } else {
        localStorage.setItem('u', value);
      }
    },
  },
};

export type AppState = {
  account?: string | null;
};

export const getInitialState = (): AppState => ({
  account: storage.accountId.get(),
});