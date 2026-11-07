import Phaser from 'phaser';
import { PowerUpType } from '../config.js';

export class PowerUpCrystal {
  public scene: Phaser.Scene;
  public x: number;
  public y: number;
  public type: PowerUpType;
  public radius: number = 16;
  public active: boolean = true;

  private graphics: Phaser.GameObjects.Graphics;
  private iconText: Phaser.GameObjects.Text;
  private bobTween?: Phaser.Tweens.Tween;
  private pulseTween?: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, x: number, y: number, type: PowerUpType) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;

    this.graphics = scene.add.graphics();
    this.graphics.setDepth(18);

    const iconSymbol =
      type === PowerUpType.Triple
        ? '⚡'
        : type === PowerUpType.Railgun
        ? '💥'
        : type === PowerUpType.Homing
        ? '🚀'
        : type === PowerUpType.ShieldHeal
        ? '🛡'
        : type === PowerUpType.EmpBomb
        ? '💣'
        : '⏱';

    this.iconText = scene.add.text(x, y, iconSymbol, {
      fontSize: '15px',
      color: '#ffffff',
    });
    this.iconText.setOrigin(0.5);
    this.iconText.setDepth(19);

    this.draw();
    this.startAnimations();
  }

  public getColor(): number {
    switch (this.type) {
      case PowerUpType.Triple:
        return 0xfacc15; // Yellow
      case PowerUpType.Railgun:
        return 0xff007f; // Magenta
      case PowerUpType.Homing:
        return 0x22c55e; // Green
      case PowerUpType.ShieldHeal:
        return 0x38bdf8; // Cyan
      case PowerUpType.EmpBomb:
        return 0xec4899; // Pink
      case PowerUpType.ChronoFreeze:
        return 0x60a5fa; // Blue
    }
  }

  private draw(): void {
    this.graphics.clear();
    const color = this.getColor();

    // 1. Outer Glow
    this.graphics.fillStyle(color, 0.25);
    this.graphics.fillCircle(this.x, this.y, this.radius + 6);

    // 2. Diamond Crystal Body
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
    this.graphics.lineStyle(1.8, 0xffffff, 0.95);
    this.graphics.strokePath();
  }

  private startAnimations(): void {
    this.bobTween = this.scene.tweens.add({
      targets: [this.iconText],
      y: this.y + 4,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    this.pulseTween = this.scene.tweens.add({
      targets: [this.graphics],
      alpha: 0.7,
      duration: 650,
      yoyo: true,
      repeat: -1,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  public checkHit(projX: number, projY: number, projRadius: number): boolean {
    if (!this.active) return false;
    const dx = projX - this.x;
    const dy = projY - this.y;
    const hitDist = this.radius + projRadius;
    return dx * dx + dy * dy <= hitDist * hitDist;
  }

  public shatter(): void {
    this.active = false;
    this.bobTween?.stop();
    this.pulseTween?.stop();

    // Expanding shockwave ring
    const ring = this.scene.add.graphics();
    ring.setDepth(21);
    const color = this.getColor();

    this.scene.tweens.addCounter({
      from: this.radius,
      to: this.radius + 45,
      duration: 350,
      ease: Phaser.Math.Easing.Cubic.Out,
      onUpdate: (tween) => {
        const rad = tween.getValue() ?? 20;
        const alpha = Math.max(0, 1 - (rad - this.radius) / 45);
        ring.clear();
        ring.lineStyle(2.5, color, alpha);
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
