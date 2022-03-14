export type GridProps = {
  grid?: {
    gap?: number | string | { x?: number | string; y?: number | string };
    autoColumns?: string | string[];
    autoRows?: string | string[];
    templateColumns?: string | string[];
    templateRows?: string | string[];
  };
};
