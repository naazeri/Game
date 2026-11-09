import Phaser from 'phaser';
import { PowerUpType, POWER_UP_INFOS, PowerUpInfo, FONTS } from '../config.js';
import { Paddle } from './Paddle.js';
import { createCrispText } from '../ui/TextHelper.js';

export class PowerUp {
  public scene: Phaser.Scene;
  public x: number;
  public y: number;
  public type: PowerUpType;
  public info: PowerUpInfo;
  public active: boolean = true;
  public width: number = 36;
  public height: number = 18;
  public speed: number = 135;

  private graphics: Phaser.GameObjects.Graphics;
  private iconText: Phaser.GameObjects.Text;
  private wobblePhase: number = Math.random() * Math.PI * 2;

  constructor(scene: Phaser.Scene, x: number, y: number, type: PowerUpType) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;
    this.info = POWER_UP_INFOS[type];

    this.graphics = scene.add.graphics().setDepth(16);
    this.iconText = createCrispText(scene, x, y, this.info.symbol, {
      fontSize: '12px',
    }).setOrigin(0.5).setDepth(17);

    this.draw();
  }

  public update(dt: number, paddle: Paddle): void {
    if (!this.active) return;

    this.wobblePhase += dt * 3.5;
    this.y += this.speed * dt;
    this.x += Math.sin(this.wobblePhase) * 20 * dt;

    this.iconText.setPosition(this.x, this.y);

    // Check collision with paddle
    const halfW = this.width / 2;
    const halfH = this.height / 2;
    const paddleBounds = paddle.getBounds();

    if (
      this.x + halfW >= paddleBounds.left &&
      this.x - halfW <= paddleBounds.right &&
      this.y + halfH >= paddleBounds.top &&
      this.y - halfH <= paddleBounds.bottom
    ) {
      this.collect();
      return;
    }

    // Off bottom of screen
    if (this.y > 620) {
      this.destroy();
      return;
    }

    this.draw();
  }

  public collect(): void {
    this.active = false;
    this.scene.events.emit('powerup-collected', this);
    this.destroy();
  }

  private draw(): void {
    this.graphics.clear();
    const halfW = this.width / 2;
    const halfH = this.height / 2;
    const px = this.x - halfW;
    const py = this.y - halfH;

    // Glowing outer pill
    this.graphics.fillStyle(this.info.color, 0.25);
    this.graphics.fillRoundedRect(px - 2, py - 2, this.width + 4, this.height + 4, 8);

    // Pill core
    this.graphics.fillStyle(0x0a101f, 0.95);
    this.graphics.fillRoundedRect(px, py, this.width, this.height, 6);

    // Neon border
    this.graphics.lineStyle(1.5, this.info.color, 0.95);
    this.graphics.strokeRoundedRect(px, py, this.width, this.height, 6);
  }

  public destroy(): void {
    this.active = false;
    this.graphics.destroy();
    this.iconText.destroy();
  }
}
