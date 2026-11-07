import Phaser from 'phaser';
import { PowerUpKind } from '../config.js';

export class PowerUp {
  public scene: Phaser.Scene;
  public x: number;
  public y: number;
  public kind: PowerUpKind;
  public radius: number = 18;
  public active: boolean = true;

  private graphics: Phaser.GameObjects.Graphics;
  private iconText: Phaser.GameObjects.Text;
  private pulseTween?: Phaser.Tweens.Tween;
  private bobTween?: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, x: number, y: number, kind: PowerUpKind) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.kind = kind;

    this.graphics = scene.add.graphics();
    this.graphics.setDepth(18);

    const iconSymbol = kind === PowerUpKind.Freeze ? '❄' : kind === PowerUpKind.Extend ? '⇕' : '⚡';
    this.iconText = scene.add.text(x, y, iconSymbol, {
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold',
      resolution: 2,
    });
    this.iconText.setOrigin(0.5);
    this.iconText.setDepth(19);

    this.draw();
    this.startAnimations();
  }

  private getColor(): number {
    switch (this.kind) {
      case PowerUpKind.Freeze:
        return 0x38bdf8; // Ice cyan
      case PowerUpKind.Extend:
        return 0x22c55e; // Growth green
      case PowerUpKind.HyperSpeed:
        return 0xfacc15; // Electric yellow
    }
  }

  private draw(): void {
    this.graphics.clear();
    const color = this.getColor();

    // 1. Soft Outer Glow
    this.graphics.fillStyle(color, 0.25);
    this.graphics.fillCircle(this.x, this.y, this.radius + 6);

    // 2. Crystal Diamond Body
    this.graphics.fillStyle(color, 0.85);
    const r = this.radius;
    this.graphics.beginPath();
    this.graphics.moveTo(this.x, this.y - r);
    this.graphics.lineTo(this.x + r, this.y);
    this.graphics.lineTo(this.x, this.y + r);
    this.graphics.lineTo(this.x - r, this.y);
    this.graphics.closePath();
    this.graphics.fillPath();

    // 3. Neon Outline
    this.graphics.lineStyle(2, 0xffffff, 0.9);
    this.graphics.strokePath();
  }

  private startAnimations(): void {
    // Gentle bobbing up and down
    this.bobTween = this.scene.tweens.add({
      targets: [this.iconText],
      y: this.y + 5,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    this.pulseTween = this.scene.tweens.add({
      targets: [this.graphics],
      alpha: 0.7,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  public checkHit(ballX: number, ballY: number, ballRadius: number): boolean {
    if (!this.active) return false;
    const dx = ballX - this.x;
    const dy = ballY - this.y;
    const distSq = dx * dx + dy * dy;
    const hitDist = this.radius + ballRadius;
    return distSq <= hitDist * hitDist;
  }

  public shatter(): void {
    this.active = false;
    this.bobTween?.stop();
    this.pulseTween?.stop();

    // Shockwave ring
    const ring = this.scene.add.graphics();
    ring.setDepth(21);
    const color = this.getColor();

    this.scene.tweens.addCounter({
      from: this.radius,
      to: this.radius + 40,
      duration: 350,
      ease: Phaser.Math.Easing.Cubic.Out,
      onUpdate: (tween) => {
        const rad = tween.getValue() ?? 20;
        const alpha = Math.max(0, 1 - (rad - this.radius) / 40);
        ring.clear();
        ring.lineStyle(3, color, alpha);
        ring.strokeCircle(this.x, this.y, rad);
      },
      onComplete: () => ring.destroy(),
    });

    this.graphics.destroy();
    this.iconText.destroy();
  }

  public destroy(): void {
    this.active = false;
    this.bobTween?.stop();
    this.pulseTween?.stop();
    this.graphics.destroy();
    this.iconText.destroy();
  }
}
