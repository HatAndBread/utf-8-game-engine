import Game from '../game/game.js';
import Sprite, { sprites } from '../sprite/sprite.js';
import handleJump from './spriteJump.js';

const updateSprites = (game: Game) => {
  if (sprites) {
    sprites.forEach((sprite) => {
      if (sprite.currentAnimation) {
        sprite.animations[sprite.currentAnimation][sprite.currentFrame].forEach(
          (char) => {
            if (
              game.rows[sprite.yPos + char.y] &&
              game.rows[sprite.yPos + char.y][sprite.xPos + char.x]
            ) {
              const pixel =
                game.rows[sprite.yPos + char.y][sprite.xPos + char.x];
              game.elementsToBeCleared.push(pixel);
              pixel.textContent = char.char;
              if (sprite.backgroundColor) {
                pixel.style.backgroundColor = sprite.backgroundColor;
              }
              if (char.backgroundColor) {
                pixel.style.backgroundColor = char.backgroundColor;
              }
              if (char.color) {
                pixel.style.color = char.color;
              }
            }
          }
        );
      }

      if (
        sprite.feelGravity &&
        !sprite.currentlyJumping &&
        !sprite.touchingPlatform()
      ) {
        console.log('I am falling');
        sprite.yPos += 1;
      } else if (
        sprite.currentlyJumping &&
        sprite.touchingPlatform() &&
        !sprite.firstJumpFrame
      ) {
        sprite.firstJumpFrame = false;
        sprite.stopJump();
      }
      handleJump(sprite);
      sprite.firstJumpFrame = false;
      sprite.updateFrame(game.currentTick);
    });
  }
};

export default updateSprites;
