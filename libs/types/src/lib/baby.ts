export type BabyTrackerType =
  | 'baby:track:wake'
  | 'baby:track:feed'
  | 'baby:track:sleep';

export type BabyTrackingData = {
  type: BabyTrackerType;
  timestamp: number;
  babyId: string;
};
