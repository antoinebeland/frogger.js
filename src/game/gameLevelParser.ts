/// <reference path="objects/bonusFactory.ts" />
/// <reference path="objects/goalDeck.ts" />
/// <reference path="objects/mobileFactory.ts" />
/// <reference path="../config.ts" />
/// <reference path="../graphics/imageLoader.ts" />
/// <reference path="../utils/random.ts" />

namespace FroggerJS.Game {

    import Bonus = FroggerJS.Game.Objects.Bonus;
    import BonusFactory = FroggerJS.Game.Objects.BonusFactory;
    import Constants = FroggerJS.Constants;
    import DisplayObject = PIXI.DisplayObject;
    import GoalDeck = FroggerJS.Game.Objects.GoalDeck;
    import ImageLoader = FroggerJS.Graphics.ImageLoader;
    import Mobile = FroggerJS.Game.Objects.Mobile;
    import MobileFactory = FroggerJS.Game.Objects.MobileFactory;
    import Random = Utils.Random;

    /**
     * Defines the parser result to return.
     */
     type GameLevelParserResult = {
         level: number,
         soundtrack: string,
         tiles: PIXI.Sprite[][],
         mobiles: Mobile[][],
         bonuses: Bonus[];
         goals: GoalDeck[],
         touchAllowedStatus: boolean[]
     }

    /**
     * Defines a parser for the levels.
     */
    export class GameLevelParser {

        private imageLoader: ImageLoader;
        private bonusFactory: BonusFactory;
        private mobileFactory: MobileFactory;

        /**
         * Initializes a new instance of the GameLevelParser class.
         *
         * @param imageLoader   The image loader to use.
         */
        public constructor(imageLoader: ImageLoader) {

            this.imageLoader = imageLoader;
            this.bonusFactory = new BonusFactory(imageLoader);
            this.mobileFactory = new MobileFactory(imageLoader);
        }

        /**
         * Parses the specified literal object and generates a LevelParserResult object based on the specified data.
         *
         * @param levelConfiguration                    The level configuration object to parse.
         * @param levelConfiguration.level              The current level.
         * @param levelConfiguration.goalsNumber        The number of goals to generate.
         * @param levelConfiguration.soundtrack         The soundtrack associated with the level.
         * @param levelConfiguration.board              The board configuration to generate.
         *
         * @return {GameLevelParserResult}      A LevelParserResult object associated with the specified data.
         */
        public parse(levelConfiguration: any): GameLevelParserResult {

            if (!levelConfiguration.hasOwnProperty("level")) {
                throw new Error("Level property is missing.");
            }
            if (!levelConfiguration.hasOwnProperty("goalsNumber")) {
                throw new Error("'Goals Number' property is missing.");
            }
            if (!levelConfiguration.hasOwnProperty("soundtrack")) {
                throw new Error("Soundtrack property is missing.");
            }
            if (!levelConfiguration.hasOwnProperty("board")) {
                throw new Error("Board property is missing.");
            }

            // Checks if the board is valid based on the window height and the tile size.
            if (levelConfiguration.board.length != Constants.WINDOW_HEIGHT / Constants.TILE_SIZE) {
                throw new Error("The level configuration isn't valid.");
            }

            // Initialization of the result variable.
            let result: GameLevelParserResult = {
                level: levelConfiguration["level"],
                soundtrack: levelConfiguration["soundtrack"],
                tiles: [],
                mobiles: [],
                bonuses: [],
                goals: [],
                touchAllowedStatus: []
            };

            const BONUS_MARGIN = 2 * Constants.TILE_SIZE;
            const HALF_TILE = Constants.TILE_SIZE * 0.5;
            const WIDTH_SPRITES_NUMBER = Constants.WINDOW_WIDTH / Constants.TILE_SIZE;

            let board = levelConfiguration.board;
            for (let i = 0; i < board.length; ++i) {

                if (!board[i].hasOwnProperty("texture")) {
                    throw new Error("Texture property is missing.");
                }
                if (!board[i].hasOwnProperty("touchAllowed")) {
                    throw new Error("TouchAllowed property is missing.");
                }

                result.touchAllowedStatus.push(board[i].touchAllowed);

                // Generates the tiles.
                result.tiles[i] = [];
                let texture = this.imageLoader.get(board[i].texture);
                for (let j = 0; j < WIDTH_SPRITES_NUMBER; ++j) {

                    let sprite = new PIXI.Sprite(texture);
                    sprite.x = j * Constants.TILE_SIZE;

                    sprite.y = i * Constants.TILE_SIZE;
                    result.tiles[i].push(sprite);
                }

                // Generates the mobiles.
                result.mobiles[i] = [];
                if (board[i].hasOwnProperty("mobile")) {
                    // Generates the bonuses.
                    result.mobiles[i] = this.parseMobile(board[i].mobile, i);
                }

                // Generates the bonuses.
                if (board[i].hasOwnProperty("bonus")) {
                    let bonus = this.bonusFactory.create(board[i].bonus);

                    let displayObject = bonus.getDisplayObject() as DisplayObject;
                    displayObject.x = Random.getRandomIntInclusive(BONUS_MARGIN, Constants.WINDOW_WIDTH - BONUS_MARGIN);
                    displayObject.y = i * Constants.TILE_SIZE + HALF_TILE;

                    result.bonuses[i] = bonus;
                }
            }

            const HALF_WIDTH_DIVIDE_BY_GOAL_DECKS_NUMBER =
                Constants.WINDOW_WIDTH / (levelConfiguration.goalsNumber * 2);

            // Generates the goal decks.
            for (let i = 0; i < levelConfiguration.goalsNumber; ++i) {
                let goalDeck = new GoalDeck(this.imageLoader);

                let displayObject = goalDeck.getDisplayObject();
                displayObject.x = HALF_WIDTH_DIVIDE_BY_GOAL_DECKS_NUMBER * (2 * i + 1);
                displayObject.y = HALF_TILE;

                result.goals.push(goalDeck);
            }

            return result;
        }

        /**
         * Parses the mobile element for a specified line index and generates the objects associated with the
         * specified element.
         *
         * @param mobileElement                 The mobile element to parse.
         * @param mobileElement.type            The type of the mobile.
         * @param mobileElement.orientation     The orientation of the mobile.
         * @param mobileElement.speed           The speed of the mobile.
         * @param [mobileElement.repeated]      Indicates if the mobile must be repeated on the line.
         *                                      The default value is TRUE.
         *
         * @param lineIndex                     The current line index.
         * @returns {Array}                     An array of mobiles for the specified line index.
         */
        private parseMobile(mobileElement: any, lineIndex: number): Mobile[] {

            const MAX_MOBILE_DISTANCE_FACTOR = 2.5;
            let mobiles: Mobile[] = [];
            let repeated = true;

            if (!mobileElement.hasOwnProperty("type")) {
                throw new Error("Type property is missing.");
            }
            if (!mobileElement.hasOwnProperty("orientation")) {
                throw new Error("Rotation property is missing.");
            }
            if (!mobileElement.hasOwnProperty("speed")) {
                throw new Error("Speed property is missing.");
            }
            if (mobileElement.hasOwnProperty("repeated")) {
                repeated = mobileElement.repeat;
            }

            let nextPosition = 0;
            let spriteWidth = 0;
            do {
                let mobileObject =
                    this.mobileFactory.create(mobileElement.type, mobileElement.orientation, mobileElement.speed);

                let sprite = mobileObject.getDisplayObject() as PIXI.Sprite;
                sprite.x = nextPosition;
                sprite.y = lineIndex * Constants.TILE_SIZE;

                // Generates the next position of the sprite.
                spriteWidth = sprite.width;
                nextPosition += spriteWidth + Random.getRandomIntInclusive(spriteWidth, MAX_MOBILE_DISTANCE_FACTOR * spriteWidth);

                mobiles.push(mobileObject);

            } while (repeated && nextPosition < Constants.WINDOW_WIDTH);

            return mobiles;
        }
    }
}
