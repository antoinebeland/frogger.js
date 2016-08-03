namespace FroggerJS {

    export var Constants: any = {
        TILE_SIZE: 60,
        ASSET_SIZE: 120,
        WINDOW_WIDTH: 780,
        WINDOW_HEIGHT: 600
    };

    export var Levels: any = [
        [
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
    ];
}
