export type BabyActivityType =
  | 'baby:activity:wake'
  | 'baby:activity:feed'
  | 'baby:activity:sleep';

export interface BabyActivityProfile {
  belongsTo: string;
  activity: BabyActivityType;
  timestamp: Date;
  notes?: string;
}

export interface BabyActivityPayload {
  account: string;
  baby: string;
  additionalDetails?: string;
}
