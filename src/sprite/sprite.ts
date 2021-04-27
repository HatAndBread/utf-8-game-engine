interface Options {
  xPos?: number;
  yPos?: number;
  color?: string;
  backgroundColor?: string;
  animationSpeed?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | 60;
  zIndex?: number;
}

type Animation = {
  char: string;
  color: string;
  backgroundColor?: string;
  x: number;
  y: number;
}[][];

export default class Sprite {
  initial: Options;
  xPos: number;
  yPos: number;
  color: string;
  backgroundColor: string;
  zIndex: number;
  currentFrame: number;
  animationSpeed: number;
  currentTick: number;
  animations: { [key: string]: Animation };
  currentAnimation: string | null;
  constructor({
    xPos = 0,
    yPos = 0,
    color = 'black',
    backgroundColor = 'transparent',
    zIndex = 0,
    animationSpeed = 5
  }: Options) {
    this.initial = { xPos, yPos, color, backgroundColor, zIndex };
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
    this.backgroundColor = backgroundColor;
    this.zIndex = zIndex;
    this.currentFrame = 0;
    this.currentTick = 0;
    this.animationSpeed = animationSpeed;
    this.animations = {};
    this.currentAnimation = null;
    Object.freeze(this.initial);
  }
  setCurrentAnimation = (name: string) => {
    if (!this.animations[name]) {
      throw new Error(`Animation ${name} does not exist on ${this}`);
    } else {
      this.currentFrame = 0;
      this.currentAnimation = name;
    }
  };
  updateFrame = () => {
    this.currentTick < 59 ? (this.currentTick += 1) : (this.currentTick = 0);
    if (
      this.currentAnimation &&
      this.currentFrame < this.animations[this.currentAnimation].length - 1
    ) {
      if (!(this.currentTick % this.animationSpeed)) this.currentFrame += 1;
    } else {
      if (!(this.currentTick % this.animationSpeed)) this.currentFrame = 0;
    }
  };
  addAnimation = (
    name: string,
    animation: {
      char: string;
      color: string;
      backgroundColor?: string;
      x: number;
      y: number;
    }[][]
  ) => (this.animations[name] = animation);
}
