import { LevelWithCrazyBalloons } from "./level10.interface";

export const Level10: LevelWithCrazyBalloons = {
    id: 10,
    name: "Crazy Balloons",
    description: `🎈 These balloons are unpredictable! <br> Try to pop as many as you can!`,
    minScoreToAdvance: 15,
    gameDuration: 60000,
    showScore: true,

    minSpeed: 5,  // Slowest movement in seconds
    maxSpeed: 10, // Fastest movement in seconds

    generateBalloon: (game) => {
        const leftPosition = Math.random() * 85;
        const speed = Math.random() * (game.currentLevel.maxSpeed - game.currentLevel.minSpeed) + game.currentLevel.minSpeed;
        const size = Math.floor(Math.random() * (80 - 50 + 1)) + 50; // Random balloon size
    
        return {
            id: Math.random(),
            className: "balloon",
            style: {
                background: game.currentLevel.getRandomColor(), 

                left: `${leftPosition}%`,
                bottom: "-80px", // Start well below screen
                width: `${size}px`,
                height: `${size + 20}px`,
                animation: `superCrazyFloat ${speed + 3}s linear forwards` // Extend duration
            }
        };
    },

    getRandomColor: () => {
        return ["red", "blue", "green", "yellow", "purple"][
            Math.floor(Math.random() * 5)
        ];
    },

    shouldPopBalloon: () => true,

    getScoreForBalloon: () => 1, // Each pop gives 1 point
    getBalloonBadge: (item: any) => null,

};
