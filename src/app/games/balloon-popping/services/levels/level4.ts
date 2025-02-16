import { Level4WithPrecomputedBalloons } from "./level4.interface";

export const Level4: Level4WithPrecomputedBalloons = {
    id: 4,
    name: "Even Number Pop",
    description: `<p>🎯 Only pop **even-numbered** balloons!  
<br>✅ <b>Safe:</b> <span style="color: green;">2, 4, 6, 8, 10</span> 🎈 </p>
<br>❌ <b>Danger:</b> <span style="color: red;">1, 3, 5, 7, 9</span> will decrease your score!  
<br>Think fast and choose wisely! 🚀`,
    minScoreToAdvance: 10,
    gameDuration: 60000,
    showScore: true,
    precomputedBalloons: [], // Initialize empty array

    initLevel: (game) => {
        const difficulty = game.levelService.getDifficulty();
        const minEvenBalloons = Level4.getMinEvenBalloonCount(difficulty, Level4.minScoreToAdvance);
    
        // Total balloons based on duration & spawn rate
        const totalBalloons = Math.floor(game.currentLevel.gameDuration / game.levelService.getSpawnRate());
    
        // Ensure we have at least `minScoreToAdvance` even balloons, but never more than totalBalloons
        const evenBalloonCount = Math.min(minEvenBalloons, totalBalloons);
    
        // Ensure there is space left for odd balloons
        let oddBalloonCount = totalBalloons - evenBalloonCount;
    
        // Ensure at least 1 odd balloon
        if (oddBalloonCount < 1) {
            oddBalloonCount = 1;
        }
    
        // Adjust even count accordingly
        const finalEvenCount = totalBalloons - oddBalloonCount;
    
        let balloonList = [];
    console.log(finalEvenCount)
        // Generate even-numbered balloons
        for (let i = 0; i < finalEvenCount; i++) {
            balloonList.push(Level4.createBalloon(true)); // true = even
        }
    
        // Generate odd-numbered balloons
        for (let i = 0; i < oddBalloonCount; i++) {
            balloonList.push(Level4.createBalloon(false)); // false = odd
        }
    
        // Shuffle balloon list so evens & odds are mixed
        game.currentLevel.precomputedBalloons = Level4.shuffleArray(balloonList);
        console.log(game.currentLevel.precomputedBalloons);
    },
    

    shuffleArray: (array) => {
        return array.sort(() => Math.random() - 0.5);
    },

    getMinEvenBalloonCount: (difficulty, minScore) => {
        switch (difficulty) {
            case "Easy": return minScore * 2;
            case "Normal": return Math.ceil(minScore * 1.5);
            case "Hard": return Math.ceil(minScore * 1.25);
            default: return minScore;
        }
    },

    generateBalloon: (game) => {
        const level = game.currentLevel as Level4WithPrecomputedBalloons;

        // Get next balloon from the precomputed list
        return level.precomputedBalloons.shift() || Level4.createBalloon(false); // Default to odd if empty
    },

    createBalloon: (isEven) => {
        const number = isEven
            ? 2 * (Math.floor(Math.random() * 5) + 1)  // Even numbers 2,4,6,8,10
            : 2 * Math.floor(Math.random() * 5) + 1;  // Odd numbers 1,3,5,7,9
        
        // Random balloon size between min and max range
        const width = Math.floor(Math.random() * (80 - 60 + 1)) + 50; // 50px to 80px
        const height = Math.floor(Math.random() * (90 - 60 + 1)) + 60; // 60px to 100px
        
        const randomSpeed = Math.random() * (10 - 6) + 6; // Between 6s and 10s

        return {
            id: Math.random(),
            number: number,
            className: "balloon", // Keep it generic for styling
            style: {
                left: `${Math.random() * 85}%`,
                bottom: `-80px`,
                animation: `floatUp ${randomSpeed}s linear forwards`,
                background: Level4.getRandomColor(),
                width: `${width}px`,
                height: `${height}px`,
                opacity: 1,
            },
        };
    },
    

    getRandomColor: () => {
        return ["red", "blue", "green", "gray", "purple"][
            Math.floor(Math.random() * 5)
        ];
    },

    getScoreForBalloon: (balloon, game) => {
        if (balloon.number % 2 === 0) {
            return 1; // Even number = +1 point
        } else {
            return game.levelService.getScore() > 0 ? -1 : 0; // Odd number = -1, but score can't go below 0
        }
    },

    shouldPopBalloon: () => true,

    getBalloonBadge: (balloon) => `${balloon.number}`, // Display number on balloon
};
