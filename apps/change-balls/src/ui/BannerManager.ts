import Phaser from 'phaser';
import { CENTER_X } from '../config';
import { createCrispText } from './TextHelper';

export interface BannerOptions {
  text: string;
  color: number;
  hex: string;
  duration?: number; // ms to hold stationary, default 2600ms
}

export class BannerManager {
  private scene: Phaser.Scene;
  private currentBanner?: Phaser.GameObjects.Container;
  private queue: BannerOptions[] = [];
  private isShowing: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public show(options: BannerOptions): void {
    this.queue.push(options);
    if (!this.isShowing) {
      this.processNext();
    }
  }

  private processNext(): void {
    if (this.queue.length === 0) {
      this.isShowing = false;
      return;
    }

    this.isShowing = true;
    const item = this.queue.shift()!;
    const holdDuration = item.duration || 2600; // hold stationary for 2.6s!

    const banner = this.scene.add.container(CENTER_X, 210);
    banner.setDepth(60);
    banner.setAlpha(0);
    banner.setScale(0.85);

    // Pill background
    const bg = this.scene.add.graphics();
    const w = 340;
    const h = 46;
    bg.fillStyle(0x0f172a, 0.92);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 23);
    bg.lineStyle(1.5, item.color, 0.95);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 23);

    // Inner subtle glow
    bg.fillStyle(item.color, 0.18);
    bg.fillRoundedRect(-w / 2 + 2, -h / 2 + 2, w - 4, h - 4, 21);

    const txt = createCrispText(this.scene, 0, 0, item.text, {
      fontSize: '17px',
      color: item.hex,
      fontStyle: 'bold',
    });
    txt.setOrigin(0.5);

    banner.add([bg, txt]);
    this.currentBanner = banner;

    // Phase 1: Slide UP and punch in (300ms)
    this.scene.tweens.add({
      targets: banner,
      y: 175,
      alpha: 1,
      scaleX: 1.0,
      scaleY: 1.0,
      duration: 300,
      ease: Phaser.Math.Easing.Back.Out,
      onComplete: () => {
        // Phase 2: HOLD STATIONARY for holdDuration (e.g. 2.6 seconds)
        // Gentle breathing pulse while holding
        const pulseTween = this.scene.tweens.add({
          targets: banner,
          scaleX: 1.04,
          scaleY: 1.04,
          duration: 650,
          yoyo: true,
          repeat: -1,
          ease: Phaser.Math.Easing.Sine.InOut,
        });

        this.scene.time.delayedCall(holdDuration, () => {
          pulseTween.stop();

          // Phase 3: Glide up and fade out smoothly (450ms)
          this.scene.tweens.add({
            targets: banner,
            y: 135,
            alpha: 0,
            scaleX: 0.9,
            scaleY: 0.9,
            duration: 450,
            ease: Phaser.Math.Easing.Cubic.In,
            onComplete: () => {
              banner.destroy();
              this.currentBanner = undefined;
              // Brief pause before next message
              this.scene.time.delayedCall(150, () => {
                this.processNext();
              });
            },
          });
        });
      },
    });
  }

  public clear(): void {
    this.queue = [];
    if (this.currentBanner) {
      this.currentBanner.destroy();
      this.currentBanner = undefined;
    }
    this.isShowing = false;
  }
}
