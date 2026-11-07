import Phaser from 'phaser';
import { Paddle } from './Paddle.js';

export class PlayerPaddle extends Paddle {
  public isPlayerOne: boolean;
  public isTwoPlayerMode: boolean;

  private keyW?: Phaser.Input.Keyboard.Key;
  private keyS?: Phaser.Input.Keyboard.Key;
  private keyUp?: Phaser.Input.Keyboard.Key;
  private keyDown?: Phaser.Input.Keyboard.Key;

  private touchUpPressed: boolean = false;
  private touchDownPressed: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, color: number, isPlayerOne: boolean, isTwoPlayerMode: boolean) {
    super(scene, x, y, color);
    this.isPlayerOne = isPlayerOne;
    this.isTwoPlayerMode = isTwoPlayerMode;

    if (scene.input.keyboard) {
      this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyUp = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.keyDown = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }
  }

  public setTouchInput(up: boolean, down: boolean): void {
    this.touchUpPressed = up;
    this.touchDownPressed = down;
  }

  public handleInput(): void {
    let dir = 0;

    if (this.isPlayerOne) {
      const isUp = (this.keyW?.isDown ?? false) || (!this.isTwoPlayerMode && (this.keyUp?.isDown ?? false)) || this.touchUpPressed;
      const isDown = (this.keyS?.isDown ?? false) || (!this.isTwoPlayerMode && (this.keyDown?.isDown ?? false)) || this.touchDownPressed;

      if (isUp && !isDown) dir = -1;
      else if (isDown && !isUp) dir = 1;
    } else {
      const isUp = (this.keyUp?.isDown ?? false) || this.touchUpPressed;
      const isDown = (this.keyDown?.isDown ?? false) || this.touchDownPressed;

      if (isUp && !isDown) dir = -1;
      else if (isDown && !isUp) dir = 1;
    }

    this.setDirection(dir);
  }
}
