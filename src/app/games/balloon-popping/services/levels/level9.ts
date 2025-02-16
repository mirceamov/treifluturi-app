import { Level9WithStars } from "./level9.interface";

export const Level9: Level9WithStars = {
    id: 9,
    name: "Catch the Falling Stars ⭐",
    description: `Pop balloons <span style="font-size: 2rem;">🎈</span> and falling golden stars <span style="font-size: 1.5rem;">⭐</span> for bonus points while popping balloons and watch out for the strange <span style="font-size: 1.5rem;">✩</span> ones!`,
    minScoreToAdvance: 20,
    gameDuration: 60000,
    spawnType: "gradual",
    showScore: true,

    starFallSpeed: { min: 4, max: 8 },

    generateBalloon: (game) => {
        const isStar = Math.random() < 0.4; // 40% chance to spawn a star instead of a balloon
        const isFakeStar = isStar && Math.random() < 0.5; // 50% chance of fake star

        const starSize = isFakeStar ? 70 : 75; // Fake stars are slightly smaller
        const balloonWidth = 60;
        const balloonHeight = 80;
        const fallSpeed = Math.random() * (game.currentLevel.starFallSpeed?.max - game.currentLevel.starFallSpeed?.min) + game.currentLevel.starFallSpeed?.min || 6;

        return {
            id: Math.random(),
            type: isStar ? "star" : "balloon",
            isFake: isFakeStar, // Only relevant for stars
            className: isStar ? "star" : "balloon", // Assign class dynamically
            style: {
                left: `${Math.random() * 80}%`,
                bottom: isStar ? "100%" : "-10%", // Stars start from top, balloons from bottom
                width: isStar ? `${starSize}px` : `${balloonWidth}px`,
                height: isStar ? `${starSize}px` : `${balloonHeight}px`,
                background: isStar
                    ? isFakeStar
                        ? "gray" // Fake stars are grayish
                        : "gold" // Real stars are bright gold
                    : game.currentLevel.getRandomColor(),
                animation: isStar
                    ? isFakeStar
                        ? `fallDown ${fallSpeed * 1.2}s linear forwards` // Fake stars fall straight
                        : `fallDown ${fallSpeed}s linear forwards, sway ${Math.random() * 3 + 2}s ease-in-out infinite` // Real stars fall + sway
                    : `floatUp ${Math.random() * 4 + 6}s linear forwards`, // Balloons float up
                filter: isStar
                    ? isFakeStar
                        ? "brightness(60%) blur(1px)" // Fake stars are dim and blurry
                        : "drop-shadow(0px 0px 5px yellow)" // Real stars glow
                    : "none"
            }
        };
    },

    getScoreForBalloon: (item: any, game: any) => {
        if (item.type == 'star') {
            return item.isFake ? -3 : 3
        }
        return 1;
    },

    shouldPopBalloon: () => true,

    getBalloonBadge: (item: any) => null,

    getRandomColor: () => {
        return ["red", "blue", "green", "purple"][
            Math.floor(Math.random() * 5)
        ];
    },
};
