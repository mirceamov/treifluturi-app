import { UtilsService } from "../utils.service";
import { Level } from "./level.interface";

export const Level11: Level = {
    id: 11,
    name: "Fruit Pop!",
    description: "", // Will be set dynamically
    minScoreToAdvance: 0, // Set in `initLevel()`
    gameDuration: 30000, // Adjusted based on difficulty
    spawnType: "instant", // All balloons appear at once
    totalItemsCount: 18, // Fixed number of items
    showScore: false, // No need for a score counter

    initLevel: (game) => {
        game.currentLevel.endLevelMessage = undefined;
        const difficulty = game.levelService.getDifficulty();
        const totalFruits = 9; // Always 9 fruits in the game

        // Set minScore based on difficulty
        switch (difficulty) {
            case "Easy": game.currentLevel.minScoreToAdvance = Math.floor(totalFruits * 0.5); break; // 50% of fruits
            case "Normal": game.currentLevel.minScoreToAdvance = Math.floor(totalFruits * 0.75); break; // 75% of fruits
            case "Hard": game.currentLevel.minScoreToAdvance = totalFruits; break; // 100% of fruits
        }

        // Update description dynamically
        game.currentLevel.description = `🍏 Find and pop <b>${game.currentLevel.minScoreToAdvance}</b> fruit balloons! 🚀`;

        // Create fruit and non-fruit balloon lists
        const fruitList = ["🍎", "🍌", "🍉", "🍓", "🍇", "🍍", "🥝", "🍑", "🍊"];
        const nonFruitList = ["🚗", "🐶", "🏀", "🎸", "🔑", "🎩", "👑", "🕶️", "🎲"];

        // Shuffle and mix the lists
        const balloonList = UtilsService.shuffleArray([...fruitList.map((emoji) => ({ emoji, isFruit: true })), 
            ...nonFruitList.map((emoji) => ({ emoji, isFruit: false }))]);

        game.currentLevel.precomputedBalloons = balloonList;
    },

    generateBalloon: (game) => {
        const level = game.currentLevel;
        const balloon = level.precomputedBalloons.shift();

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

        return balloon
            ? {
                id: Math.random(),
                emoji: balloon.emoji,
                isFruit: balloon.isFruit,
                className: "balloon", // Round shape for consistency
                style: {
                    left: `${left}%`,
                    top: `${top}%`,
                    background: game.currentLevel.getRandomColor(),
                    width: "65px",
                    height: "65px",
                },
            }
            : null;
    },

    getScoreForBalloon: () => 1, // No scoring needed, just check if fruits are popped

    shouldPopBalloon: (balloon) => { // Only fruits pop
        if(balloon.isFruit) return true; 
            
        const popSound = new Audio("assets/sounds/shake.mp3");
        popSound.play();
        return false;
    }, 

    getBalloonBadge: (balloon) => `<span style="font-size: 1.5rem;">${balloon.emoji}</span>`,

    getRandomColor: () => {
        return ["red", "blue", "green", "yellow", "purple"][
            Math.floor(Math.random() * 5)
        ];
    },

    shouldEndGame: (game) => {
        const poppedFruits = game.levelService.getScore(); // Fruits popped so far
        const shouldEnd = poppedFruits >= game.currentLevel.minScoreToAdvance; // End when enough fruits are popped
        
        if (shouldEnd) {
            const difficulty = game.levelService.getDifficulty();
            switch (difficulty) {
                case "Easy": 
                    game.currentLevel.endLevelMessage = "🍓 Fantastic! You're a fruit-popping pro! <br> Try a harder challenge! 🍍";
                    break;
                case "Normal": 
                    game.currentLevel.endLevelMessage = "🍎 Great job! You’re getting really good at this! <br> How about Hard mode? 🍊";
                    break; 
                case "Hard": 
                    game.currentLevel.endLevelMessage = "🍉 WOW! You are the Fruit Champion! 🏆 <br> Keep up the amazing work!";
                    break;
            }
        }
        return shouldEnd;
    },
    
};
