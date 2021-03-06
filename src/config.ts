/// <reference path="./utils/logger.ts" />

namespace FroggerJS {

    export var Constants: any = {
        ACTIVE_LOG_LEVEL: Utils.LogLevel.Info,
        AUDIO_MUTED: false,
        AVAILABLE_LIVES: 5,
        DEFAULT_TEXT_MARGIN: 15,
        DEFAULT_TEXT_STYLE: { font : "40px Arial", fill : "white" },
        DISPLAY_BOUNDING: false, // For DEBUG purpose
        GOAL_SCORE: 100,
        MOVE_SCORE: 10,
        PANEL_COLOR: 0x0D7EB4,
        TILE_SIZE: 120,
        VERSION: "1.0.0",
        WINDOW_WIDTH: 1560,
        WINDOW_HEIGHT: 1200
    };

    export var Levels: any = [
        {
            goalsNumber: 3,
            soundtrack: "game1",
            board: [
                { texture: "grass-water-top", touchAllowed: true },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 1.5 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1 } },
                { texture: "grass-water-bottom", touchAllowed: true, bonus: "star" },
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1 } },
                { texture: "road-middle-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1.5 } },
                { texture: "road-middle-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1.5 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1 } },
                { texture: "grass", touchAllowed: true }
            ]
        },
        {
            goalsNumber: 3,
            soundtrack: "game2",
            board: [
                { texture: "grass-water-top", touchAllowed: true },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 1 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 2.5 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1 } },
                { texture: "grass-water-bottom", touchAllowed: true, bonus: "heart" },
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1 } },
                { texture: "road-middle-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 2 } },
                { texture: "road-middle-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 2 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1 } },
                { texture: "grass", touchAllowed: true }
            ]
        },
        {
            goalsNumber: 3,
            soundtrack: "game3",
            board: [
                { texture: "grass-water-top", touchAllowed: true },
                { texture: "water", touchAllowed: false, mobile: { type: "turtle", orientation: "right", speed: 1.25 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 2.25 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1.5 } },
                { texture: "grass-water-bottom", touchAllowed: true, bonus: "star" },
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1 } },
                { texture: "road-middle-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 2.25 } },
                { texture: "road-middle-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 2.25 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1 } },
                { texture: "grass", touchAllowed: true }
            ]
        },
        {
            goalsNumber: 3,
            soundtrack: "game4",
            board: [
                { texture: "grass-water-top", touchAllowed: true },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1.75 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 2.5 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 3 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 2 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1.5 } },
                { texture: "grass-water-bottom", touchAllowed: true, bonus: "heart" },
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 2 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1.5 } },
                { texture: "grass", touchAllowed: true }
            ]
        },
        {
            goalsNumber: 2,
            soundtrack: "game5",
            board: [
                { texture: "water", touchAllowed: false },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 1.5 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 2.5 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1 } },
                { texture: "grass-water-bottom", touchAllowed: true, bonus: "heart", mobile: { type: "snake", orientation: "right", speed: 2.5, repeated: false } },
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1.5 } },
                { texture: "road-middle-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 2 } },
                { texture: "road-middle-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 2 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1.5 } },
                { texture: "grass", touchAllowed: true }
            ]
        },
        {
            goalsNumber: 2,
            soundtrack: "game1",
            board: [
                { texture: "water", touchAllowed: false },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 2 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 3 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1.5 } },
                { texture: "grass-water-bottom", touchAllowed: true, bonus: "star", mobile: { type: "snake", orientation: "right", speed: 2.5 } },
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1.5 } },
                { texture: "road-middle-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 2 } },
                { texture: "road-middle-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 2.5 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1 } },
                { texture: "grass", touchAllowed: true }
            ]
        },
        {
            goalsNumber: 2,
            soundtrack: "game2",
            board: [
                { texture: "water", touchAllowed: false },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 3 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 3 } },
                { texture: "grass-water-bottom", touchAllowed: true, bonus: "heart" },
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 2 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 2.25 } },
                { texture: "grass-water-top", touchAllowed: true, mobile: { type: "snake", orientation: "right", speed: 2.5 } },
                { texture: "water", touchAllowed: false, mobile: { type: "turtle", orientation: "left", speed: 2.5 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 3 } },
                { texture: "grass-water-bottom", touchAllowed: true }
            ]
        },
        {
            goalsNumber: 2,
            soundtrack: "game3",
            board: [
                { texture: "water", touchAllowed: false },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 2.25 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 2.75 } },
                { texture: "water", touchAllowed: false, mobile: { type: "turtle", orientation: "right", speed: 3 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 2.5 } },
                { texture: "water", touchAllowed: false, mobile: { type: "turtle", orientation: "right", speed: 2 } },
                { texture: "grass-water-bottom", touchAllowed: true, bonus: "star", mobile: { type: "snake", orientation: "right", speed: 2.6, repeated: false } },
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 2.5 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 3 } },
                { texture: "grass", touchAllowed: true }
            ]
        },
        {
            goalsNumber: 2,
            soundtrack: "game4",
            board: [
                { texture: "water", touchAllowed: false },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 3.4 } },
                { texture: "water", touchAllowed: false, mobile: { type: "turtle", orientation: "left", speed: 3 } },
                { texture: "grass-water-bottom", touchAllowed: true, bonus: "star", mobile: { type: "snake", orientation: "right", speed: 2.75 } },
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 2.25 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 2 } },
                { texture: "grass-water-top", touchAllowed: true, bonus: "heart" },
                { texture: "water", touchAllowed: false, mobile: { type: "turtle", orientation: "right", speed: 3 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 3.25 } },
                { texture: "grass-water-bottom", touchAllowed: true }
            ]
        },
        {
            goalsNumber: 1,
            soundtrack: "game5",
            board: [
                { texture: "water", touchAllowed: false },
                { texture: "water", touchAllowed: false, mobile: { type: "turtle", orientation: "left", speed: 3.25 } },
                { texture: "water", touchAllowed: false, mobile: { type: "turtle", orientation: "left", speed: 4 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 4.25 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 3.6 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 3.35 } },
                { texture: "grass-water-bottom", touchAllowed: true, bonus: "heart", mobile: { type: "snake", orientation: "right", speed: 2.75 } },
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 3.5 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 3.25 } },
                { texture: "grass", touchAllowed: true }
            ]
        }
    ];
}
