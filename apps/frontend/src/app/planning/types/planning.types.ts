/**
 * planning.types.ts
 * Basic types used by planning module. Extend as needed.
 */

export type TankRecommendation = {
  sizeL: number;
  type: string;
  reason?: string;
};

export type FiltrationConfig = {
  firstFlushMm?: number;
  filters?: string[];
};

export type SubsidyItem = {
  scheme: string;
  eligible: boolean;
  docs?: string[];
};
