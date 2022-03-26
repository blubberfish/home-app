export type BabyTrackerType =
  | 'baby:track:wake'
  | 'baby:track:feed'
  | 'baby:track:sleep';

export interface BabyProfile {
  givenName: string;
  familyName: string;
  preferredName?: string;
  dateOfBirth: Date | string | number;
}

export type BabyTrackingData = {
  type: BabyTrackerType;
  timestamp: number;
  babyId: string;
};
