namespace FroggerJS {

    export var Constants: any = {
        TILE_SIZE: 120,
        WINDOW_WIDTH: 1560,
        WINDOW_HEIGHT: 1200,
        AUDIO_MUTED: false,
        DISPLAY_BOUNDING: false, // For DEBUG purpose
        AVAILABLE_LIVES: 5,
        DEFAULT_TEXT_STYLE: { font : "40px Arial", fill : "white" },
        DEFAULT_TEXT_MARGIN: 15,
        PANEL_COLOR: 0x0D7EB4
    };

    export var Levels: any = [
        {
            goalsNumber: 1/*5*/,
            soundtrack: "game1",
            board: [
                { texture: "grass-water-top", touchAllowed: true },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 1.5 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1 } },
                { texture: "grass-water-bottom", touchAllowed: true},
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1 } },
                { texture: "road-middle-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1.5 } },
                { texture: "road-middle-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1.5 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1 } },
                { texture: "grass", touchAllowed: true }
            ]
        },
        {
            goalsNumber: 1/*5*/,
            soundtrack: "game2",
            board: [
                { texture: "grass-water-top", touchAllowed: true },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 1 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "left", speed: 2.5 } },
                { texture: "water", touchAllowed: false, mobile: { type: "boat", orientation: "right", speed: 1 } },
                { texture: "grass-water-bottom", touchAllowed: true},
                { texture: "road-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 1 } },
                { texture: "road-middle-top", touchAllowed: true, mobile: { type: "car", orientation: "left", speed: 2 } },
                { texture: "road-middle-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 2 } },
                { texture: "road-bottom", touchAllowed: true, mobile: { type: "car", orientation: "right", speed: 1 } },
                { texture: "grass", touchAllowed: true }
            ]
        }
    ];
}
