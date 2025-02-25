import { Level } from "./level.interface";

export const Level2: Level = {
    id: 2,
    name: "Big Balloon Challenge",
    description: `<p>
  Only pop the big <span style="font-size: 2rem;">🎈</span> ballons! 
  Small <span style="font-size: 1rem;">🎈</span> balloons will decrease your score.
  </p>`,
    minScoreToAdvance: 10,
    gameDuration: 60000,
    showScore: true,

    generateBalloon: () => {
        const randomX = Math.random() * 85;
        const randomSpeed = Math.random() * (8 - 5) + 5; // Between 5s and 8s
        const isBig = Math.random() > 0.4; // 60% chance for big/small balloon

        return {
            id: Math.random(),
            size: isBig ? "big" : "small", // Add size property
            className: "balloon",
            style: {
                left: `${randomX}%`,
                bottom: `-80px`,
                animation: `floatUp ${randomSpeed}s linear forwards`,
                background: Level2.getRandomColor(),
                width: isBig ? "80px" : "40px", // Big balloons are larger
                height: isBig ? "100px" : "50px", // Big balloons are taller
                opacity: 1
            },
        };
    },

    getRandomColor: () => {
        const colors = ["red", "blue", "green", "yellow", "purple"];
        return colors[Math.floor(Math.random() * colors.length)];
    },
    getScoreForBalloon: (balloon, game) => balloon.size === "big" ? 1 : (game.levelService.getScore() > 0 ? -1 : 0),

    shouldPopBalloon: (balloon) => true,
    getBalloonBadge: () => null,

};
