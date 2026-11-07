import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config.js';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  layer: number;
  color: number;
}

export class Starfield {
  private graphics: Phaser.GameObjects.Graphics;
  private stars: Star[] = [];
  private timeElapsed: number = 0;

  constructor(scene: Phaser.Scene) {
    this.graphics = scene.add.graphics();
    this.graphics.setDepth(1);
    this.generateStars();
    this.draw();
  }

  private generateStars(): void {
    const starCount = 95;
    const colors = [0xffffff, 0x93c5fd, 0xc084fc, 0x67e8f9];

    for (let i = 0; i < starCount; i++) {
      const layer = Math.random() < 0.65 ? 1 : Math.random() < 0.9 ? 2 : 3;
      const baseAlpha = layer === 1 ? 0.35 : layer === 2 ? 0.65 : 0.95;
      const radius = layer === 1 ? 1 : layer === 2 ? 1.5 : 2.2;

      this.stars.push({
        x: Math.random() * GAME_WIDTH,
        y: Math.random() * GAME_HEIGHT,
        radius,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: Math.random() * 2.5 + 1.2,
        layer,
        color: Phaser.Utils.Array.GetRandom(colors),
      });
    }
  }

  public update(dt: number, aimOffsetX: number = 0, aimOffsetY: number = 0): void {
    this.timeElapsed += dt;

    for (const star of this.stars) {
      // Gentle twinkle
      star.alpha = star.baseAlpha + Math.sin(this.timeElapsed * star.twinkleSpeed) * 0.25;
      star.alpha = Phaser.Math.Clamp(star.alpha, 0.1, 1.0);

      // Subtle parallax drift
      const speed = star.layer * 4;
      star.y += speed * dt;
      if (star.y > GAME_HEIGHT) {
        star.y = 0;
        star.x = Math.random() * GAME_WIDTH;
      }
    }

    this.draw(aimOffsetX, aimOffsetY);
  }

  private draw(aimOffsetX: number = 0, aimOffsetY: number = 0): void {
    this.graphics.clear();

    // Deep cosmic space gradient
    this.graphics.fillStyle(0x060810, 1);
    this.graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Subtle radial nebula in the center
    this.graphics.fillStyle(0x131a30, 0.45);
    this.graphics.fillCircle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 280);

    this.graphics.fillStyle(0x1e153b, 0.25);
    this.graphics.fillCircle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 160);

    // Subtle radar orbital rings centered on the player
    this.graphics.lineStyle(1, 0x1d2c44, 0.35);
    this.graphics.strokeCircle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 90);
    this.graphics.strokeCircle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 180);
    this.graphics.strokeCircle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 270);

    // Draw stars with subtle parallax
    for (const star of this.stars) {
      const px = star.x + (aimOffsetX * (star.layer * 0.02));
      const py = star.y + (aimOffsetY * (star.layer * 0.02));

      this.graphics.fillStyle(star.color, star.alpha);
      this.graphics.fillCircle(px, py, star.radius);
    }
  }

  public destroy(): void {
    this.graphics.destroy();
  }
}
