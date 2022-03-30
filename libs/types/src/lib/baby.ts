export type BabyActivityType =
  | 'baby:activity:wake'
  | 'baby:activity:feed'
  | 'baby:activity:sleep';

export interface BabyProfile {
  belongsTo: string;
  activity: BabyActivityType;
  timestamp: Date;
  notes?: string;
}
