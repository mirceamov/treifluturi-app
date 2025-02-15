import { Level } from "./level.interface";

export const Level3: Level = {
    id: 3,
    name: "Tough Balloons",
    description: "Big balloons pop on 3 click, small ones need 1 clicks!",
    minScoreToAdvance: 10,
    gameDuration: 30000,
    showScore: true,
    
    generateBalloon: () => {
        const isBig = Math.random() > 0.5; // 50% chance for big/small balloon
        return {
            id: Math.random(),
            clicksRequired: isBig ? 3 : 1, // Big pops in 3, small pops in 1
            currentClicks: 0,
            size: isBig ? "big" : "small",
            style: {
                left: `${Math.random() * 85}%`,
                bottom: `0%`,
                animation: `floatUp 8s linear forwards`,
                background: Level3.getRandomColor(),
                width: isBig ? "80px" : "40px",
                height: isBig ? "100px" : "50px",
                opacity: 1,
            },
        };
    },

    getRandomColor: () => {
        return ["pink", "blue", "green", "yellow", "purple"][
            Math.floor(Math.random() * 5)
        ];
    },

    getScoreForBalloon: () => 1,

    shouldPopBalloon: (balloon) => {
        balloon.currentClicks++;
        if (balloon.currentClicks < balloon.clicksRequired) {
            const popSound = new Audio("assets/sounds/shake.mp3");
            popSound.play();
            return false;
        }

        return true;
    },

    /*
        getBalloonBadge: (balloon) => {
            return `${balloon.clicksRequired - balloon.currentClicks}`;
        }
    */
    getBalloonBadge: () => null,

};