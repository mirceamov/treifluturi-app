export interface Level {
    id: number;
    name: string;
    description: string;
    minScoreToAdvance: number;
    allowedColors?: string[]; // Dacă avem nivele cu culori specifice
    allowFakeBalloons?: boolean;
    requireEvenNumbers?: boolean;
    gameDuration : number;
    spawnType?: "gradual" | "instant"; // OPTIONAL, defaults to "gradual"
    totalItemsCount?: number; // Number of items for instant spawn (optional)
    
    startLevel?: (game: any) => void;
    generateBalloon: (game: any) => any; // Now takes game instance
    getRandomColor: () => any; // Function to generate a balloon
    getScoreForBalloon: (balloon: any, game: any) => number;
    shouldPopBalloon: (balloon: any) => boolean;  
    getBalloonBadge?: (balloon: any) => string | null; 
  }