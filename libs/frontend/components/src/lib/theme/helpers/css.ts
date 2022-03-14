export const num2Px = (value: string | number) =>
  typeof value === 'number' ? `${value}px` : value;
