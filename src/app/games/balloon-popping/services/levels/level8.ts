import { Level8WithSequence } from "./level8.interface";

export const Level8: Level8WithSequence = {
    id: 8,
    name: "Find the Number Sequence",
    description: "Find and pop the numbers in the correct order!",    
    minScoreToAdvance: 1,
    gameDuration: 30000, 
    spawnType: "instant",
    totalItemsCount: 15, // Total balloons in the level
    showScore: false,
    sequenceToFind: [],
    precomputedBalloons: [],
    currentSequenceIndex: 0,

    initLevel: (game) => {
        game.currentLevel.endLevelMessage = undefined;
        const difficulty = game.levelService.getDifficulty();
        const sequenceLength = difficulty === "Easy" ? 3 : difficulty === "Normal" ? 4 : 5;

        // ✅ Generate the correct sequence to find
        const min = 1;
        const max = 9; // Numbers range from 1-9
        let sequence = new Set<number>();

        while (sequence.size < sequenceLength) {
            sequence.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }

        game.currentLevel.sequenceToFind = Array.from(sequence);
        game.currentLevel.currentSequenceIndex = 0; // Start at the beginning

        // ✅ Create 15 total balloons, including the correct sequence
        let balloons = [...game.currentLevel.sequenceToFind];

        while (balloons.length < game.currentLevel.totalItemsCount) {
            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            balloons.push(randomNum);
        }

        // ✅ Shuffle the balloons
        for (let i = balloons.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [balloons[i], balloons[j]] = [balloons[j], balloons[i]];
        }

        game.currentLevel.precomputedBalloons = balloons;
        game.currentLevel.description = `Find and pop the numbers in the correct order: <b>${game.currentLevel.sequenceToFind}</b>`  

    },

    generateBalloon: (game) => {
        const level = game.currentLevel as Level8WithSequence;
        const nextNumber = level.precomputedBalloons.shift() || 1;

        let left: number = Math.random() * 80;
        let top: number = Math.random() * 80;
        let attempts: number = 0;
        let tooClose: boolean = true;

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
            number: nextNumber,
            style: {
                left: `${left}%`,
                top: `${top}%`,
                background: game.currentLevel.getRandomColor(),        
            }
        };
    },

    shouldPopBalloon: (balloon, game) => {
        const level = game.currentLevel as Level8WithSequence;

        const isInSequence = balloon.number === level.sequenceToFind[level.currentSequenceIndex];
        
        if(isInSequence) 
            level.currentSequenceIndex++;
        else {
            const popSound = new Audio("assets/sounds/shake.mp3");
            popSound.play();
        }
        
        return isInSequence;
    },

    getScoreForBalloon: (balloon, game) => {
        const level = game.currentLevel as Level8WithSequence;

        if (balloon.number === level.sequenceToFind[level.currentSequenceIndex]) {
            level.currentSequenceIndex++;

            // ✅ If the full sequence is completed, set score to 1
            if (level.currentSequenceIndex === level.sequenceToFind.length) {
                return 1;
            }

            return 0;
        } else {
            return 0;
        }
    },

    getBalloonBadge: (balloon) => {
        return `<span style="font-size: 1.5rem; font-weight: bold;">${balloon.number}</span>`;
    },

    getRandomColor: () => {
        return ["red", "blue", "green", "purple"][
            Math.floor(Math.random() * 5)
        ];
    },
    
    shouldEndGame: (game) => {
        const level = game.currentLevel as Level8WithSequence;
        const foundSequence = level.currentSequenceIndex === level.sequenceToFind.length; // ✅ Ends game when full sequence is found
        
        if (foundSequence) {
            game.levelService.increaseScore(1);
    
            const difficulty = game.levelService.getDifficulty();
            switch (difficulty) {
                case "Easy": 
                    game.currentLevel.endLevelMessage = "🎉 Amazing! You found the right numbers! <br> Want to try a harder challenge? 🔢";
                    break;
                case "Normal": 
                    game.currentLevel.endLevelMessage = "👏 Well done! Your number skills are sharp! <br> Can you beat the hardest level? 🚀";
                    break; 
                case "Hard": 
                    game.currentLevel.endLevelMessage = "🌟 Genius! You cracked the toughest sequence! <br> You’re a true math wizard! 🏆";
                    break;
            }
    
            return true;
        }
        
        return false;
    },
    
};
