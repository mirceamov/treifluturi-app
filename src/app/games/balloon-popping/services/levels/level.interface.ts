export interface Level {
    id: number;
    name: string;
    description: string;
    minScoreToAdvance: number;
    allowedColors?: string[]; // Dacă avem nivele cu culori specifice
    allowFakeBalloons?: boolean;
    requireEvenNumbers?: boolean;
    balloonSpeedRange: { min: number; max: number }; // Interval de viteză
    gameDuration : number;

    generateBalloon: () => any; // Function to generate a balloon
    getRandomColor: () => any; // Function to generate a balloon
    isBalloonValid: (balloon: any) => boolean; // Function to validate if the balloon can be popped
    getScoreForBalloon: (balloon: any, game: any) => number;
    shouldPopBalloon: (balloon: any) => boolean;  
    getBalloonBadge?: (balloon: any) => string | null; 
  }