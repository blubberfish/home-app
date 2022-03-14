export type GridProps = {
  grid?: {
    alignContent?: string;
    alignItems?: string;
    justifyContent?: string;
    justifyItems?: string;
    gap?: number | string | { x?: number | string; y?: number | string };
    autoColumns?: string | string[];
    autoFlow?: string;
    autoRows?: string | string[];
    templateColumns?: string | string[];
    templateRows?: string | string[];
  };
};
