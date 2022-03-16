export type LayoutProps = {
  column?: { index: number; span?: number };
  row?: { index: number; span?: number };
  alignSelf?:
    | 'start'
    | 'center'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'stretch'
    | 'auto'
    | 'normal';
  justifySelf?:
    | 'start'
    | 'center'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'stretch'
    | 'auto'
    | 'normal';
};
