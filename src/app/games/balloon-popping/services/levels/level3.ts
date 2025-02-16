import { Level } from "./level.interface";

export const Level3: Level = {
    id: 3,
    name: "Tough Balloons",
    description: `<p><span style="font-size: 2rem;">🎈</span> big ballons need <span style="font-size: 2rem;">3</span> pushes to pop!</p> 
<p><span style="font-size: 1.5rem;">🎈</span> small ballons need only <span style="font-size: 1.5rem;">2</span> pushes! </p> 
<br><br>Tap carefully and pop them all! 🎯🏆`,
    minScoreToAdvance: 10,
    gameDuration: 60000,
    showScore: true,

    generateBalloon: () => {
        const isBig = Math.random() > 0.5; // 50% chance for big/small balloon
        const randomSpeed = Math.random() * (10 - 6) + 6; // Between 6s and 10s

        return {
            id: Math.random(),
            clicksRequired: isBig ? 3 : 2, // Big pops in 3, small pops in 2
            currentClicks: 0,
            size: isBig ? "big" : "small",
            className: "balloon",
            style: {
                left: `${Math.random() * 85}%`,
                bottom: `-80px`,
                animation: `floatUp ${randomSpeed}s linear forwards`,
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