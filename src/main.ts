import * as s from './index.js';

const animationOne = [
  [
    { char: '◯', color: 'red', x: 1, y: 0 },
    { char: '▻', color: 'lightblue', x: 2, y: 0 },
    { char: '◢', color: 'red', x: 0, y: 1 },
    { char: '◘', color: 'blue', x: 1, y: 1 },
    { char: '◣', color: 'red', x: 2, y: 1 },
    { char: '╱', color: 'yellow', x: 0, y: 2 },
    { char: '╲', color: 'yellow', x: 2, y: 2 }
  ],
  [
    { char: '◯', color: 'red', x: 1, y: 0 },
    { char: '▻', color: 'yellow', x: 2, y: 0 },
    { char: '◄', color: 'orange', x: 0, y: 1 },
    { char: '◘', color: 'blue', x: 1, y: 1 },
    { char: '►', color: 'aqua', x: 2, y: 1 },
    { char: '╱', color: 'yellow', x: 0, y: 2 },
    { char: '╲', color: 'yellow', x: 2, y: 2 }
  ]
];
const sprite = new s.Sprite({
  xPos: 10,
  yPos: 10,
  zIndex: 1,
  animationSpeed: 12
});

s.onSpriteClicked(sprite, (coords) => {
  console.log('You clicked on the sprite!', coords);
});

s.onClick((coords) => {
  console.log(coords, '🎉');
});
sprite.addAnimation('main', animationOne);
sprite.addAnimation('secondary', [
  [{ char: 'L', color: 'pink', x: 0, y: 0 }],
  [{ char: 'Z', color: 'yellow', x: 1, y: 0 }],
  [{ char: 'P', color: 'yellow', x: 1, y: 0 }],
  [{ char: '🧀', color: 'yellow', x: 4, y: 1 }]
]);
sprite.setCurrentAnimation('main');
const secondSprite = new s.Sprite({
  xPos: 15,
  yPos: 15,
  backgroundColor: 'orange',
  zIndex: 2,
  animationSpeed: 5
});
secondSprite.addAnimation('two', [[{ char: '✺', color: 'white', x: 0, y: 0 }]]);
secondSprite.setCurrentAnimation('two');

const snows = [];
for (let i = 0; i < 10; i++) {
  const snow = new s.Sprite({
    xPos: Math.floor(Math.random() * 20),
    yPos: Math.floor(Math.random() * 20),
    zIndex: 3
  });
  snow.addAnimation('main', [[{ char: '❄', color: 'snow', x: 0, y: 0 }]]);
  snow.setCurrentAnimation('main');
  s.onCollision(snow, sprite, true, () => {
    sprite.setCurrentAnimation('secondary');
  });
  snows.push(snow);
}

const game = new s.Game({
  width: 50,
  height: 20,
  pixelSize: 20,
  backgroundColor: 'black',
  keyboardSpeed: 3
});

s.onKeyDown('ArrowUp', () => (sprite.yPos -= 1));
s.onKeyDown('ArrowDown', () => (sprite.yPos += 1));
s.onKeyDown('ArrowLeft', () => (sprite.xPos -= 1));
s.onKeyDown('ArrowRight', () => (sprite.xPos += 1));

s.onKeyUp('ArrowUp', () => {
  console.log('Hi!');
});
s.onCollision(sprite, secondSprite, true, () => {
  sprite.setCurrentAnimation('main');
  console.log('FIIIIIIIIII');
});

game.everyTick((tick) => {});

declare global {
  interface Window {
    game: any;
  }
}

window.game = game;
