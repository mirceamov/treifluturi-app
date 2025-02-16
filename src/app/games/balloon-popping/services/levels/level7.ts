import { Level7MatchingPairs } from "./level7.interface";

export const Level7: Level7MatchingPairs = {
    id: 7,
    name: "Memory Match Balloons",
    description: `🎯 Find and pop <b>matching pairs</b>!`,
    minScoreToAdvance: 5,
    gameDuration: 20000,
    spawnType: "instant",
    totalItemsCount: 16, // Number of balloons
    showScore: true,

    emojiList: ["🐱", "🚗", "🍎", "🐶", "🦄", "🌈", "🎸", "🍉"], // Emojis used
    lastPoppedBalloon: null, // Store last popped balloon here
    pairList: [], // Initialize empty pair list

    initLevel: (game) => {
        const level = game.currentLevel as Level7MatchingPairs;
        level.lastPoppedBalloon = null; // Reset last popped on level start
        level.pairList = []; // Ensure pairList is reset        
    },

    generateBalloon: (game) => {
        const level = game.currentLevel as Level7MatchingPairs;

        if (!level.pairList || level.pairList.length === 0) {
            let emojiPairs = [...level.emojiList, ...level.emojiList]; // Create pairs
            emojiPairs = emojiPairs.sort(() => Math.random() - 0.5); // Shuffle
            level.pairList = emojiPairs;
        }

        const emoji = level.pairList.pop()!; // Non-null assertion

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
            emoji: emoji,
            matched: false,
            style: {
                left: `${left}%`,
                top: `${top}%`,
                background: level.getRandomColor(),
            },
        };
    },

    getRandomColor: () => {
        return ["red", "blue", "green", "yellow", "purple"][
            Math.floor(Math.random() * 5)
        ];
    },

    getBalloonBadge: (balloon) => {
        return `<span style="font-size: 2rem;">${balloon.emoji}</span>`; // Display emoji
    },

    shouldPopBalloon: () => true,

    getScoreForBalloon: (balloon, game) => {
       
        const level = game.currentLevel as Level7MatchingPairs;
        if (level.lastPoppedBalloon === null) {
            // First selection: Store balloon, no penalty yet
            level.lastPoppedBalloon = { id: balloon.id, emoji: balloon.emoji };
            return 0; // No score change on first pick
        }
    
        if (level.lastPoppedBalloon.emoji === balloon.emoji &&
            level.lastPoppedBalloon.id !== balloon.id) {
            // ✅ Correct match! Reset and reward points
            level.lastPoppedBalloon = null;
            return 1;
        } else {
            // ❌ Wrong match! Penalize and reset
            level.lastPoppedBalloon = null;
            return -1;
        }
    }
};
