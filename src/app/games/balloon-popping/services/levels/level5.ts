import { LevelWithRedBalloons } from "./level5.interface";

export const Level5: LevelWithRedBalloons = {
    id: 5,
    name: "Catch the Red Balloons",
    description: "Only pop red balloons! Any other color decreases your score.",
    minScoreToAdvance: 5,
    gameDuration: 10000,
    redBalloonCount: 0,

    generateBalloon: (game) => {
        const difficulty = game.levelService.getDifficulty();
        const minRedBalloons = Level5.getMinRedBalloonCount(difficulty, Level5.minScoreToAdvance);

        const spawnRate = game.levelService.getSpawnRate();
        const totalBalloons = Math.floor(game.currentLevel.gameDuration / spawnRate); // Estimate total balloons in game
        const redBalloonRatio = minRedBalloons / totalBalloons; // Calculate % of reds needed

        const isRed = Math.random() < redBalloonRatio;
        
        if (isRed) Level5.redBalloonCount++;

        return Level5.createBalloon(isRed ? "red" : Level5.getRandomColor());
    },

    getMinRedBalloonCount: (difficulty, minScore) => {
        switch (difficulty) {
            case "Easy": return minScore + 5;
            case "Normal": return minScore + 2;
            case "Hard": return minScore;
            default: return minScore;
        }
    },

    createBalloon: (color) => {
        return {
            id: Math.random(),
            color: color,
            style: {
                left: `${Math.random() * 85}%`,
                bottom: `-5%`,
                animation: `floatUp 8s linear forwards`,
                background: color,
                width: "60px",
                height: "80px",
                opacity: 1,
            },
        };
    },

    getRandomColor: () => {
        //const colors = ["blue", "green", "yellow", "purple"];
        const colors = ['#FF6F61', '#6A0572', '#FFC107', '#4CAF50', '#29B6F6', '#FF4081'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    getScoreForBalloon: (balloon, game) => {
        if (balloon.color === "red") {
            return 1;
        } else {
            console.log('not red');
            return game.levelService.getScore() > 0 ? -1 : 0;
        }
    },

    shouldPopBalloon: (balloon) => {
        if (balloon.color === "red") {
            Level5.redBalloonCount--; // Reduce red count when popped
        }
        return true;
    },

    getBalloonBadge: () => null,
};
