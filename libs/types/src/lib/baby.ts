export type BabyActivityType =
  | 'baby:activity:wake'
  | 'baby:activity:feed'
  | 'baby:activity:feed:latch:l'
  | 'baby:activity:feed:latch:r'
  | 'baby:activity:feed:bottle'
  | 'baby:activity:nurse'
  | 'baby:activity:nurse:urinate'
  | 'baby:activity:nurse:defecate'
  | 'baby:activity:nurse'
  | 'baby:activity:sleep';

export interface BabyActivityProfile {
  belongsTo: string;
  activity: BabyActivityType;
  timestamp: Date;
  notes?: string;
}

export type BabyActivityProfilePayload = Omit<
  BabyActivityProfile,
  'timestamp'
> & {
  _id: string;
  timestamp: string;
};

export interface BabyActivityPayload {
  account: string;
  baby: string;
  additionalDetails?: string;
}
