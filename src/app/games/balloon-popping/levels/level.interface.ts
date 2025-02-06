export interface Level {
    id: number;
    name: string;
    description: string;
    minScoreToAdvance: number;
    allowedColors?: string[]; // Dacă avem nivele cu culori specifice
    allowFakeBalloons?: boolean;
    requireEvenNumbers?: boolean;
    balloonSpeedRange: { min: number; max: number }; // Interval de viteză
  }