import { Level6WithMathChallenge } from "./level6.interface";

export const Level6: Level6WithMathChallenge = {
    id: 6,
    name: "Math Challenge Balloons",
    description: "", // Will be set in initLevel()
    minScoreToAdvance: 5,
    gameDuration: 30000, // Will be updated in initLevel()
    spawnType: "instant", // Instantly spawn all balloons
    totalItemsCount: 15, // Set total number of balloons
    showScore: true,
    targetNumber: 0, // The correct answer to match
    correctBalloonsToFind: 0, // Store how many correct balloons need to be found

    initLevel: (game: any) => {
        const level = game.currentLevel as Level6WithMathChallenge;

        level.targetNumber = Math.floor(Math.random() * 10) + 2;
        level.description = `🎯 Pop all balloons that equal <b>
        <span style="font-size: 2rem; color: #ff5733;">${level.targetNumber}</span>
        </b>`;

        // Determine how many correct balloons must be popped based on difficulty
        level.correctBalloonsToFind = Math.floor(
            game.levelService.getDifficulty() === "Easy" ? level.minScoreToAdvance * 2 :
            game.levelService.getDifficulty() === "Normal" ? level.minScoreToAdvance * 1.5 :
            level.minScoreToAdvance // Hard = exactly minScoreToAdvance
        );

        console.log(`Level 6 Target Number: ${level.targetNumber}`);
        console.log(`Must pop at least ${level.correctBalloonsToFind} correct balloons to win.`);
    },

    generateBalloon: (game): any => {
        const level = game.currentLevel as Level6WithMathChallenge;
        const minScore: number = level.minScoreToAdvance;

        let num1: number, num2: number, operation: string, equation: string, result: number;
        let shouldBeCorrect: boolean = game.balloons.filter((b: any) => b.result === level.targetNumber).length < level.correctBalloonsToFind;

        if (shouldBeCorrect) {
            num1 = Math.floor(Math.random() * level.targetNumber);
            num2 = level.targetNumber - num1;
            operation = "+";
            equation = `${num1} + ${num2}`;
            result = level.targetNumber;
        } else {
            // Generate a random incorrect answer
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operation = Math.random() < 0.5 ? "+" : "-";
            equation = `${num1} ${operation} ${num2}`;
            result = operation === "+" ? num1 + num2 : num1 - num2;

            // Ensure incorrect answer does not match the target
            if (result === level.targetNumber) {
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
            className: "balloon",
            equation: equation,
            result: result,
            style: {
                left: `${left}%`,
                top: `${top}%`,
                background: level.getRandomColor(),
                width: "70px",
                height: "90px",
            },            
        };
    },

    getRandomColor: () => {
        const colors = ["purple", "red", "blue"];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    getScoreForBalloon: (balloon, game) => {
        return balloon.result === game.currentLevel.targetNumber ? 1 : game.levelService.getScore() > 0 ? -1 : 0;
    },

    shouldPopBalloon: () => true,

    getBalloonBadge: (balloon) =>  `<span style="font-size: 1.2rem; width:60px">${balloon.equation}</span>`,

    /** End the game when all required correct balloons have been popped */
    shouldEndGame: (game) => {
        return game.levelService.getScore() >= (game.currentLevel as Level6WithMathChallenge).correctBalloonsToFind;
    }
};
