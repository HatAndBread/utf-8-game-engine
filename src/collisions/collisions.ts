import Game from '../game/game.js';
import Sprite from '../sprite/sprite.js';
type CollisionObjects = {
  spriteOne: Sprite | string;
  spriteTwo: Sprite | string;
  callback: () => any;
}[];

const collisionObjects: CollisionObjects = [];
const onCollision = (
  spriteOne: Sprite | string,
  spriteTwo: Sprite | string,
  callback: () => any
) => {
  if (
    (spriteOne instanceof Sprite && spriteTwo instanceof Sprite) ||
    (typeof spriteOne === 'string' && typeof spriteTwo === 'string')
  ) {
    collisionObjects.push({ spriteOne, spriteTwo, callback });
  } else if (typeof spriteOne === 'string') {
    collisionObjects.push({
      spriteOne: spriteTwo,
      spriteTwo: spriteOne,
      callback
    });
  } else {
    collisionObjects.push({ spriteOne, spriteTwo, callback });
  }
};

const detectCollisions = (game: Game) => {
  if (game.sprites && game.sprites.length > 1) {
    for (let i = 0; i < game.sprites.length; i++) {
      for (let j = 0; j < game.sprites.length; j++) {
        if (i !== j && areColliding(game.sprites[i], game.sprites[j])) {
          callCallbackIfExists(game.sprites[i], game.sprites[j]);
        }
      }
    }
  }
};

const areColliding = (spriteOne: Sprite, spriteTwo: Sprite): boolean => {
  for (let i = 0; i < spriteOne.currentCoords.length; i++) {
    for (let j = 0; j < spriteTwo.currentCoords.length; j++) {
      if (
        spriteOne.currentCoords[i].x === spriteTwo.currentCoords[j].x &&
        spriteOne.currentCoords[i].y === spriteTwo.currentCoords[j].y
      ) {
        return true;
      }
    }
  }
  return false;
};

const callCallbackIfExists = (spriteOne: Sprite, spriteTwo: Sprite) => {
  collisionObjects.forEach((obj) => {
    if (obj.spriteOne instanceof Sprite && obj.spriteTwo instanceof Sprite) {
      if (
        (obj.spriteOne === spriteOne && obj.spriteTwo === spriteTwo) ||
        (obj.spriteOne === spriteTwo && obj.spriteTwo === spriteOne)
      ) {
        obj.callback();
      }
    }
  });
};

export { detectCollisions, onCollision };