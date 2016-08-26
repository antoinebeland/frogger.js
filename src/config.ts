namespace FroggerJS {

    export var Constants: any = {
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
            goalsNumber: 5,
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
            goalsNumber: 1,
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
        }
    ];
}
