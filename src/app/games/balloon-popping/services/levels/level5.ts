import { LevelWithRedBalloons } from "./level5.interface";

export const Level5: LevelWithRedBalloons = {
    id: 5,
    name: "Catch the Red Balloons",
    description: "Only pop <span style='color: red; font-size: xx-large;'>red</span> balloons! Any other color decreases your score.",
    minScoreToAdvance: 5,
    gameDuration: 30000,
    showScore: true,
    redBalloonCount: 0,
    precomputedBalloons: [], // Initialize empty array

    initLevel: (game) => {
        const difficulty = game.levelService.getDifficulty();
    
        // ✅ Ensure gameDuration is set before anything else
        const gameDuration = game.levelService.getGameDuration(game.currentLevel);
    
        const level = game.currentLevel as LevelWithRedBalloons;
        level.redBalloonCount = 0;
        level.precomputedBalloons = []; // ✅ Store balloon sequence
    
        const spawnRate = game.levelService.getSpawnRate();
        const totalBalloons = Math.floor(gameDuration / spawnRate); // ✅ Now this is safe!
        const minRedBalloons = Level5.getMinRedBalloonCount(difficulty, Level5.minScoreToAdvance);
    
        // ✅ Create an array with the right amount of red and other balloons
        let balloonSequence = Array(totalBalloons).fill(null);
    
        // ✅ Set minimum red balloons in random positions
        let redIndexes = new Set();
        while (redIndexes.size < minRedBalloons) {
            redIndexes.add(Math.floor(Math.random() * totalBalloons));
        }
    
        // ✅ Fill the array with "red" where needed, and random colors elsewhere
        for (let i = 0; i < totalBalloons; i++) {
            if (redIndexes.has(i)) {
                balloonSequence[i] = "red";
                level.redBalloonCount++;
            } else {
                balloonSequence[i] = Level5.getRandomColor();
            }
        }
    
        // ✅ Shuffle the array for randomness
        for (let i = balloonSequence.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [balloonSequence[i], balloonSequence[j]] = [balloonSequence[j], balloonSequence[i]];
        }
    
        level.precomputedBalloons = balloonSequence; // ✅ Store for later use
    },
    

    
    generateBalloon: (game) => {
        const level = game.currentLevel as LevelWithRedBalloons;
        // ✅ Get the next precomputed balloon type
        const nextColor = level.precomputedBalloons.shift() || Level5.getRandomColor();

        return Level5.createBalloon(nextColor);
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
            className: "balloon",
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
        const colors = ["blue", "green", "yellow", "purple"];
        //const colors = ['#FF6F61', '#6A0572', '#FFC107', '#4CAF50', '#29B6F6', '#FF4081'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    getScoreForBalloon: (balloon, game) => {
        if (balloon.color === "red") {
            return 1;
        } else {
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
