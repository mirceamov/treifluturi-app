import { LevelWithMathChallenge } from "./level6.interface";

export const Level6: LevelWithMathChallenge = {
    id: 6,
    name: "Math Challenge Balloons",
    description: "", // Will be set in startLevel()
    minScoreToAdvance: 5,
    gameDuration: 30000, // Will be updated in startLevel()
    spawnType: "instant", // Instantly spawn all balloons
    totalItemsCount: 15, // Set total number of balloons
    targetNumber: 0, // The correct answer to match

    startLevel: (game: any) => {
        game.currentLevel.targetNumber = Math.floor(Math.random() * 10) + 2;
        game.currentLevel.description = `🎯 Pop all balloons that equal <b>
        <span style="font-size: 2rem; color: #ff5733;">${game.currentLevel.targetNumber}</span>
        </b>`;
    },

    generateBalloon: (game): any => {
        const target: number = (game.currentLevel as LevelWithMathChallenge).targetNumber;
        const totalBalloons: number = game.currentLevel.totalItemsCount ?? 20; // Default if not set
        const minScore: number = game.currentLevel.minScoreToAdvance;
    
        // Compute the required number of correct answers based on difficulty
        const correctBalloonCount: number = Math.floor(
            game.levelService.getDifficulty() === "Easy" ? minScore * 2 :
            game.levelService.getDifficulty() === "Normal" ? minScore * 1.5 :
            minScore // Hard = exactly minScore
        );
    
        // Track how many correct balloons have been generated
        let correctGenerated = game.balloons.filter((b: any) => b.result === target).length;
    
        let num1: number, num2: number, operation: string, equation: string, result: number;
        let shouldBeCorrect: boolean = correctGenerated < correctBalloonCount;
    
        if (shouldBeCorrect) {
            // Ensure correct answer by generating numbers that add up to the target
            num1 = Math.floor(Math.random() * target);
            num2 = target - num1;
            operation = "+";
            equation = `${num1} + ${num2}`;
            result = target;
            correctGenerated++;
        } else {
            // Generate a random incorrect answer
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operation = Math.random() < 0.5 ? "+" : "-";
            equation = `${num1} ${operation} ${num2}`;
            result = operation === "+" ? num1 + num2 : num1 - num2;
    
            // Ensure incorrect answer does not match the target
            if (result === target) {
                result += Math.random() < 0.5 ? 1 : -1;
            }
        }
    
        let left: number = Math.random() * 80;
        let top: number = Math.random() * 80;
        let attempts: number = 0;
        let tooClose: boolean = true;
    
        // Ensure no overlapping balloons
        while (tooClose && attempts < 10) {
            left = Math.random() * 80;
            top = Math.random() * 80;
            tooClose = game.balloons.some((b: any) =>
                Math.abs(parseFloat(b.style.left) - left) < 10 &&
                Math.abs(parseFloat(b.style.top) - top) < 10
            );
            attempts++;
        }
    
        return {
            id: Math.random(),
            equation: equation,
            result: result,
            style: {
                left: `${left}%`,
                top: `${top}%`,
                background: game.currentLevel.getRandomColor(),
            },
        };
    },
    


    getRandomColor: () => {
        return ["purple"];
    },

    getScoreForBalloon: (balloon, game) => {
        return balloon.result === game.currentLevel.targetNumber ? 1 : game.levelService.getScore() > 0 ? -1 : 0;
    },

    shouldPopBalloon: () => true,

    getBalloonBadge: (balloon) => balloon.equation,
};

