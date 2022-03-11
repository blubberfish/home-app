import { ReactNode } from 'react';
import { Box } from './box';

export enum AlertType {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

export type AlertProps = {
  type: AlertType;
  children?: ReactNode;
};

const alertColors: { [key in AlertType]: { bg: string; color: string } } = {
  [AlertType.Error]: {
    bg: 'error.0',
    color: 'error.1',
  },
  [AlertType.Info]: {
    bg: 'info.0',
    color: 'info.1',
  },
  [AlertType.Success]: {
    bg: 'success.0',
    color: 'success.1',
  },
  [AlertType.Warning]: {
    bg: 'warning.0',
    color: 'warning.1',
  },
};

export const Alert = ({ children, type }: AlertProps) => {
  return (
    <Box borderRadius={3} px={3} py={2} {...alertColors[type]}>
      {children}
    </Box>
  );
};
