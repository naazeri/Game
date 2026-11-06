import Phaser from 'phaser';

export class HeartsUI {
  private scene: Phaser.Scene;
  public container: Phaser.GameObjects.Container;
  private maxLives: number = 3;
  private currentLives: number = 1;

  private heartSlots: Phaser.GameObjects.Container[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number, initialLives: number = 1) {
    this.scene = scene;
    this.currentLives = initialLives;
    this.container = scene.add.container(x, y);

    this.createHearts();
  }

  private createHearts(): void {
    this.heartSlots = [];
    const spacing = 26;
    const startX = -((this.maxLives - 1) * spacing) / 2;

    for (let i = 0; i < this.maxLives; i++) {
      const slot = this.scene.add.container(startX + i * spacing, 0);

      // Node graphic
      const heart = this.scene.add.graphics();
      this.drawHeart(heart, i < this.currentLives);
      heart.setName('heartGraphic');

      slot.add(heart);
      this.container.add(slot);
      this.heartSlots.push(slot);
    }
  }

  private drawHeart(graphics: Phaser.GameObjects.Graphics, isFull: boolean): void {
    graphics.clear();
    const rOuter = 10;
    const rCore = 6.5;

    if (isFull) {
      // Soft ambient cyan glow aura
      graphics.fillStyle(0x38bdf8, 0.22);
      graphics.fillCircle(0, 0, rOuter + 3);

      // Outer sleek energetic ring
      graphics.lineStyle(1.6, 0x38bdf8, 1);
      graphics.strokeCircle(0, 0, rOuter);

      // Inner radiant energy core
      graphics.fillStyle(0x0ea5e9, 1);
      graphics.fillCircle(0, 0, rCore);

      // White specular core highlight
      graphics.fillStyle(0xffffff, 0.95);
      graphics.fillCircle(-2, -2, 2.2);
    } else {
      // Empty depleted cell slot
      // Dark hollow cavity
      graphics.fillStyle(0x0f172a, 0.65);
      graphics.fillCircle(0, 0, rOuter);

      // Dim titanium outline ring
      graphics.lineStyle(1.4, 0x475569, 0.6);
      graphics.strokeCircle(0, 0, rOuter);

      // Dim center indicator dot
      graphics.fillStyle(0x334155, 0.6);
      graphics.fillCircle(0, 0, 2);
    }
  }

  public setLives(lives: number): void {
    this.currentLives = Math.max(0, Math.min(this.maxLives, lives));
    for (let i = 0; i < this.maxLives; i++) {
      const slot = this.heartSlots[i];
      const heart = slot.getByName('heartGraphic') as Phaser.GameObjects.Graphics;
      if (heart) {
        this.drawHeart(heart, i < this.currentLives);
      }
    }
  }

  public addLife(): boolean {
    if (this.currentLives >= this.maxLives) return false;
    const slotIdx = this.currentLives;
    this.currentLives++;

    const slot = this.heartSlots[slotIdx];
    const heart = slot.getByName('heartGraphic') as Phaser.GameObjects.Graphics;
    if (heart) {
      this.drawHeart(heart, true);

      // Joyful scale pulse & golden spark
      slot.setScale(0);
      this.scene.tweens.add({
        targets: slot,
        scaleX: 1.45,
        scaleY: 1.45,
        duration: 180,
        yoyo: true,
        ease: Phaser.Math.Easing.Back.Out,
      });

      this.spawnHeartSparks(this.container.x + slot.x, this.container.y);
    }
    return true;
  }

  public loseLife(): boolean {
    if (this.currentLives <= 0) return false;
    this.currentLives--;
    const slotIdx = this.currentLives;

    const slot = this.heartSlots[slotIdx];
    const heart = slot.getByName('heartGraphic') as Phaser.GameObjects.Graphics;

    if (heart) {
      // Shatter effect
      this.spawnHeartShatter(this.container.x + slot.x, this.container.y);

      this.scene.tweens.add({
        targets: slot,
        scaleX: 0.7,
        scaleY: 0.7,
        duration: 120,
        yoyo: true,
        onComplete: () => {
          this.drawHeart(heart, false);
          slot.setScale(1);
        },
      });
    }

    return true;
  }

  public getLives(): number {
    return this.currentLives;
  }

  public reset(lives: number = 1): void {
    this.setLives(lives);
  }

  private spawnHeartSparks(x: number, y: number): void {
    for (let i = 0; i < 10; i++) {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const dist = Phaser.Math.Between(15, 38);
      const spark = this.scene.add.graphics();
      spark.fillStyle(0x38bdf8, 0.95);
      spark.fillCircle(0, 0, Phaser.Math.Between(2, 3));
      spark.setPosition(x, y);

      this.scene.tweens.add({
        targets: spark,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        alpha: 0,
        duration: 350,
        ease: Phaser.Math.Easing.Cubic.Out,
        onComplete: () => spark.destroy(),
      });
    }
  }

  private spawnHeartShatter(x: number, y: number): void {
    for (let i = 0; i < 12; i++) {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const dist = Phaser.Math.Between(15, 45);
      const frag = this.scene.add.graphics();
      frag.fillStyle(0x38bdf8, 0.95);
      frag.fillCircle(0, 0, Phaser.Math.Between(2, 3));
      frag.setPosition(x, y);

      this.scene.tweens.add({
        targets: frag,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        alpha: 0,
        scaleX: 0.3,
        scaleY: 0.3,
        duration: 380,
        ease: Phaser.Math.Easing.Cubic.Out,
        onComplete: () => frag.destroy(),
      });
    }
  }
}
