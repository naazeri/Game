import Phaser from 'phaser';
import {
  BALL_RADIUS,
  PILLAR_ARM_LENGTH,
  ROTATION_DURATION,
  BallColor,
  COLORS,
} from '../config';

export class BallPillar {
  public scene: Phaser.Scene;
  public container: Phaser.GameObjects.Container;
  public isLeft: boolean;

  private ballWhite: Phaser.GameObjects.Sprite;
  private ballBlack: Phaser.GameObjects.Sprite;
  private rodGraphics: Phaser.GameObjects.Graphics;
  private pivotGlow: Phaser.GameObjects.Graphics;

  private isFlipped: boolean = false;
  private isTweening: boolean = false;
  private targetRotation: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, isLeft: boolean) {
    this.scene = scene;
    this.isLeft = isLeft;

    this.container = scene.add.container(x, y);

    // Rod connecting the balls
    this.rodGraphics = scene.add.graphics();
    this.drawRod();
    this.container.add(this.rodGraphics);

    // Ball dimensions
    const ballDiameter = BALL_RADIUS * 2;
    const scale = ballDiameter / 500; // 500x500 source image

    // Ball positions in local coordinates
    // If isLeft: White is at +armLength (y=360), Black is at -armLength (y=100)
    // If isRight: White is at -armLength (y=360), Black is at +armLength (y=620)
    const whiteLocalY = isLeft ? PILLAR_ARM_LENGTH : -PILLAR_ARM_LENGTH;
    const blackLocalY = isLeft ? -PILLAR_ARM_LENGTH : PILLAR_ARM_LENGTH;

    this.ballWhite = scene.add.sprite(0, whiteLocalY, 'white_ball');
    this.ballWhite.setScale(scale);

    this.ballBlack = scene.add.sprite(0, blackLocalY, 'black_ball');
    this.ballBlack.setScale(scale);

    this.container.add([this.ballWhite, this.ballBlack]);

    // Center pivot cap
    this.pivotGlow = scene.add.graphics();
    this.drawPivot();
    this.container.add(this.pivotGlow);
  }

  private drawRod(): void {
    this.rodGraphics.clear();
    const len = PILLAR_ARM_LENGTH;
    const halfWidth = 10;

    // Rod body with shadow and rounded caps (metallic dark silver / titanium)
    this.rodGraphics.fillStyle(COLORS.rodBorder, 0.95);
    this.rodGraphics.fillRoundedRect(-halfWidth - 2, -len, (halfWidth + 2) * 2, len * 2, halfWidth + 2);

    this.rodGraphics.fillStyle(COLORS.rodColor, 1);
    this.rodGraphics.fillRoundedRect(-halfWidth, -len, halfWidth * 2, len * 2, halfWidth);

    // Subtle silver/chrome center line accent
    this.rodGraphics.lineStyle(2, COLORS.rodAccentLine, 0.7);
    this.rodGraphics.lineBetween(0, -len + 15, 0, len - 15);

    // Subtle highlight line on the left edge for metallic bevel feel
    this.rodGraphics.lineStyle(1, 0xffffff, 0.25);
    this.rodGraphics.lineBetween(-halfWidth + 2, -len + 10, -halfWidth + 2, len - 10);
  }

  private drawPivot(): void {
    this.pivotGlow.clear();

    // Outer dark housing
    this.pivotGlow.fillStyle(0x0f172a, 0.95);
    this.pivotGlow.fillCircle(0, 0, 18);

    // Silver/chrome outer ring
    this.pivotGlow.lineStyle(2, COLORS.pivotRing, 0.95);
    this.pivotGlow.strokeCircle(0, 0, 18);

    // Inner metallic center
    this.pivotGlow.fillStyle(COLORS.pivotCap, 1);
    this.pivotGlow.fillCircle(0, 0, 10);

    // Inner silver bezel
    this.pivotGlow.lineStyle(1, COLORS.silverLight, 0.8);
    this.pivotGlow.strokeCircle(0, 0, 10);

    // Specular shine point
    this.pivotGlow.fillStyle(0xffffff, 0.95);
    this.pivotGlow.fillCircle(-3, -3, 3);
  }

  public flip(): void {
    this.isFlipped = !this.isFlipped;
    this.targetRotation += Math.PI;

    if (this.isTweening) {
      // If already mid-flip, continue smoothly to the new target
      this.scene.tweens.killTweensOf(this.container);
    }

    this.isTweening = true;
    this.scene.tweens.add({
      targets: this.container,
      rotation: this.targetRotation,
      duration: ROTATION_DURATION,
      ease: Phaser.Math.Easing.Cubic.Out,
      onComplete: () => {
        this.isTweening = false;
        // Keep rotation bounded between 0 and 2*PI to prevent huge numbers
        if (this.targetRotation >= Math.PI * 2) {
          this.targetRotation -= Math.PI * 2;
          this.container.rotation = this.targetRotation;
        }
      },
    });

    // Also pulse pivot slightly on flip
    this.scene.tweens.add({
      targets: this.pivotGlow,
      scaleX: 1.25,
      scaleY: 1.25,
      duration: 70,
      yoyo: true,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  public getActiveColor(): BallColor {
    // When isFlipped is false, White is at CenterY.
    // When isFlipped is true, Black is at CenterY.
    return this.isFlipped ? 'black' : 'white';
  }

  public getActiveBallWorldPosition(): { x: number; y: number } {
    // Returns current world coordinate of the active ball facing CenterY
    const localY = this.isFlipped
      ? (this.isLeft ? -PILLAR_ARM_LENGTH : PILLAR_ARM_LENGTH)
      : (this.isLeft ? PILLAR_ARM_LENGTH : -PILLAR_ARM_LENGTH);

    // Convert local point rotated by container.rotation to world coordinates
    const cos = Math.cos(this.container.rotation);
    const sin = Math.sin(this.container.rotation);
    const wx = this.container.x - sin * localY;
    const wy = this.container.y + cos * localY;

    return { x: wx, y: wy };
  }

  public reset(): void {
    this.scene.tweens.killTweensOf(this.container);
    this.isFlipped = false;
    this.isTweening = false;
    this.targetRotation = 0;
    this.container.rotation = 0;
  }
}
