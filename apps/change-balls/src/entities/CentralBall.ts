import Phaser from 'phaser';
import {
  BALL_RADIUS,
  CENTER_X,
  CENTER_Y,
  BallColor,
  COLORS,
} from '../config';

export interface HeatTierInfo {
  tier: number;
  name: string;
  color: number;
  hex: string;
}

export const HEAT_TIERS: HeatTierInfo[] = [
  { tier: 0, name: 'SILVER', color: 0xe2e8f0, hex: '#e2e8f0' },
  { tier: 1, name: 'CYAN ENERGY', color: 0x38bdf8, hex: '#38bdf8' },
  { tier: 2, name: 'EMERALD RUSH', color: 0x10b981, hex: '#10b981' },
  { tier: 3, name: 'SOLAR GOLD', color: 0xfbbf24, hex: '#fbbf24' },
  { tier: 4, name: 'BLAZING HEAT', color: 0xf97316, hex: '#f97316' },
  { tier: 5, name: 'HYPER CRIMSON', color: 0xef4444, hex: '#ef4444' },
];

export function getHeatTierForScore(score: number): HeatTierInfo {
  const index = Math.floor(score / 10);
  return HEAT_TIERS[Math.min(index, HEAT_TIERS.length - 1)];
}

export class CentralBall {
  public scene: Phaser.Scene;
  public container: Phaser.GameObjects.Container;
  public currentColor: BallColor = 'white';
  public currentScore: number = 0;

  private whiteSprite: Phaser.GameObjects.Sprite;
  private blackSprite: Phaser.GameObjects.Sprite;
  private glowRing: Phaser.GameObjects.Graphics;
  private shieldBubble?: Phaser.GameObjects.Graphics;
  public isInvulnerable: boolean = false;

  public vx: number = 0;
  private baseSpeed: number = 460;
  private notChangedCount: number = 0;

  // Trail
  private trailTimer: number = 0;

  constructor(scene: Phaser.Scene, speed: number = 460) {
    this.scene = scene;
    this.baseSpeed = speed;

    this.container = scene.add.container(CENTER_X, CENTER_Y);

    const ballDiameter = BALL_RADIUS * 2;
    const scale = ballDiameter / 500;

    // Glowing rim
    this.glowRing = scene.add.graphics();
    this.drawGlow(this.currentColor);
    this.container.add(this.glowRing);

    // Sprites
    this.whiteSprite = scene.add.sprite(0, 0, 'white_ball');
    this.whiteSprite.setScale(scale);

    this.blackSprite = scene.add.sprite(0, 0, 'black_ball');
    this.blackSprite.setScale(scale);
    this.blackSprite.setVisible(false);

    this.container.add([this.whiteSprite, this.blackSprite]);
  }

  public updateScore(score: number): { tierChanged: boolean; tierInfo: HeatTierInfo } {
    const oldTier = Math.floor(this.currentScore / 10);
    this.currentScore = score;
    const newTier = Math.floor(score / 10);
    const tierInfo = getHeatTierForScore(score);

    this.drawGlow(this.currentColor);

    const tierChanged = newTier > oldTier && newTier > 0;
    if (tierChanged) {
      // Big celebratory heat pulse
      const wave = this.scene.add.graphics();
      wave.setPosition(this.container.x, this.container.y);
      wave.lineStyle(3, tierInfo.color, 0.95);
      wave.strokeCircle(0, 0, BALL_RADIUS);
      this.scene.tweens.add({
        targets: wave,
        scaleX: 3.2,
        scaleY: 3.2,
        alpha: 0,
        duration: 450,
        ease: Phaser.Math.Easing.Cubic.Out,
        onComplete: () => wave.destroy(),
      });
    }

    return { tierChanged, tierInfo };
  }

  private drawGlow(color: BallColor): void {
    this.glowRing.clear();
    const radius = BALL_RADIUS + 3;
    const tierInfo = getHeatTierForScore(this.currentScore);

    if (tierInfo.tier === 0) {
      if (color === 'white') {
        this.glowRing.lineStyle(3, 0xffffff, 0.4);
        this.glowRing.strokeCircle(0, 0, radius);
        this.glowRing.lineStyle(1.5, COLORS.silverLight, 0.85);
        this.glowRing.strokeCircle(0, 0, radius + 1);
      } else {
        this.glowRing.lineStyle(3, COLORS.silverDark, 0.5);
        this.glowRing.strokeCircle(0, 0, radius);
        this.glowRing.lineStyle(1.5, COLORS.silverMid, 0.7);
        this.glowRing.strokeCircle(0, 0, radius + 1);
      }
    } else {
      // Energetic warm colored aura
      const warmColor = tierInfo.color;
      this.glowRing.lineStyle(4, warmColor, 0.5);
      this.glowRing.strokeCircle(0, 0, radius + 1);
      this.glowRing.lineStyle(2, warmColor, 0.95);
      this.glowRing.strokeCircle(0, 0, radius);
      this.glowRing.lineStyle(1, 0xffffff, 0.8);
      this.glowRing.strokeCircle(0, 0, radius - 1);
    }
  }

  public startMoving(toRight: boolean = true): void {
    this.vx = toRight ? this.baseSpeed : -this.baseSpeed;
  }

  public update(delta: number): void {
    const dt = delta / 1000;
    this.container.x += this.vx * dt;

    // Subtle motion trail
    this.trailTimer += delta;
    if (this.trailTimer > 35 && Math.abs(this.vx) > 0) {
      this.trailTimer = 0;
      this.spawnTrailParticle();
    }
  }

  private spawnTrailParticle(): void {
    const scale = (BALL_RADIUS * 2) / 500 * 0.85;
    const trail = this.scene.add.sprite(
      this.container.x,
      this.container.y,
      this.currentColor === 'white' ? 'white_ball' : 'black_ball'
    );
    trail.setScale(scale);
    trail.setAlpha(0.3);
    trail.setDepth(this.container.depth - 1);

    const tierInfo = getHeatTierForScore(this.currentScore);
    if (tierInfo.tier > 0) {
      // Warm glowing trail tint
      trail.setTint(tierInfo.color);
    }

    this.scene.tweens.add({
      targets: trail,
      alpha: 0,
      scaleX: scale * 0.4,
      scaleY: scale * 0.4,
      duration: 180,
      ease: Phaser.Math.Easing.Linear,
      onComplete: () => {
        trail.destroy();
      },
    });
  }

  public bounceAndDecideColor(onColorChangeCallback: () => void): void {
    // Reverse movement direction
    this.vx = -this.vx;

    // Subtle bounce squash & stretch
    this.scene.tweens.add({
      targets: this.container,
      scaleX: 0.82,
      scaleY: 1.18,
      duration: 60,
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    // Color swap decision (50% or max 3 consecutive unchanged)
    const changeColor = Math.random() > 0.5;
    if (changeColor || this.notChangedCount >= 3) {
      this.notChangedCount = 0;

      // 50ms delay matching original Unity Player.cs
      this.scene.time.delayedCall(50, () => {
        this.switchColor();
        onColorChangeCallback();
      });
    } else {
      this.notChangedCount++;
    }
  }

  private switchColor(): void {
    this.currentColor = this.currentColor === 'white' ? 'black' : 'white';

    // Crossfade and pulse
    if (this.currentColor === 'white') {
      this.whiteSprite.setVisible(true);
      this.whiteSprite.setAlpha(0);
      this.scene.tweens.add({
        targets: this.whiteSprite,
        alpha: 1,
        duration: 90,
      });
      this.scene.tweens.add({
        targets: this.blackSprite,
        alpha: 0,
        duration: 90,
        onComplete: () => this.blackSprite.setVisible(false),
      });
    } else {
      this.blackSprite.setVisible(true);
      this.blackSprite.setAlpha(0);
      this.scene.tweens.add({
        targets: this.blackSprite,
        alpha: 1,
        duration: 90,
      });
      this.scene.tweens.add({
        targets: this.whiteSprite,
        alpha: 0,
        duration: 90,
        onComplete: () => this.whiteSprite.setVisible(false),
      });
    }

    this.drawGlow(this.currentColor);

    // Ripple wave effect
    const ripple = this.scene.add.graphics();
    ripple.setPosition(this.container.x, this.container.y);
    const rippleColor = this.currentColor === 'white' ? 0xffffff : COLORS.silverMid;
    ripple.lineStyle(2, rippleColor, 0.9);
    ripple.strokeCircle(0, 0, BALL_RADIUS);

    this.scene.tweens.add({
      targets: ripple,
      scaleX: 2.2,
      scaleY: 2.2,
      alpha: 0,
      duration: 250,
      ease: Phaser.Math.Easing.Cubic.Out,
      onComplete: () => ripple.destroy(),
    });
  }

  public activateShield(durationMs: number = 1200): void {
    this.isInvulnerable = true;

    if (!this.shieldBubble) {
      this.shieldBubble = this.scene.add.graphics();
      this.container.add(this.shieldBubble);
    }

    this.shieldBubble.clear();
    const r = BALL_RADIUS + 7;
    this.shieldBubble.lineStyle(2.5, 0x38bdf8, 0.95);
    this.shieldBubble.strokeCircle(0, 0, r);
    this.shieldBubble.fillStyle(0x38bdf8, 0.2);
    this.shieldBubble.fillCircle(0, 0, r);
    this.shieldBubble.setVisible(true);
    this.shieldBubble.setAlpha(1);

    this.scene.tweens.add({
      targets: this.shieldBubble,
      scaleX: 1.15,
      scaleY: 1.15,
      alpha: 0.5,
      duration: 160,
      yoyo: true,
      repeat: Math.floor(durationMs / 320),
      ease: Phaser.Math.Easing.Sine.InOut,
    });

    this.scene.time.delayedCall(durationMs, () => {
      this.isInvulnerable = false;
      if (this.shieldBubble) {
        this.scene.tweens.add({
          targets: this.shieldBubble,
          alpha: 0,
          duration: 150,
          onComplete: () => {
            if (this.shieldBubble) this.shieldBubble.setVisible(false);
          },
        });
      }
    });
  }

  public reset(speed?: number): void {
    if (speed !== undefined) {
      this.baseSpeed = speed;
    }
    this.isInvulnerable = false;
    if (this.shieldBubble) {
      this.shieldBubble.setVisible(false);
    }
    this.currentScore = 0;
    this.scene.tweens.killTweensOf(this.container);
    this.container.setPosition(CENTER_X, CENTER_Y);
    this.container.setScale(1, 1);
    this.currentColor = 'white';
    this.whiteSprite.setVisible(true);
    this.whiteSprite.setAlpha(1);
    this.blackSprite.setVisible(false);
    this.blackSprite.setAlpha(1);
    this.drawGlow('white');
    this.vx = 0;
    this.notChangedCount = 0;
    this.trailTimer = 0;
  }

  public getX(): number {
    return this.container.x;
  }

  public getY(): number {
    return this.container.y;
  }
}
