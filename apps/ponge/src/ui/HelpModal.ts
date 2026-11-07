import Phaser from 'phaser';
import { AudioManager } from '../audio/AudioManager.js';
import { createCrispText } from './TextHelper.js';

export class HelpModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private isVisible: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0);
    this.container.setDepth(100);
    this.container.setVisible(false);

    this.createContent();
  }

  private createContent(): void {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;

    // Dark backdrop overlay
    const backdrop = this.scene.add.graphics();
    backdrop.fillStyle(0x000000, 0.75);
    backdrop.fillRect(0, 0, width, height);
    backdrop.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    backdrop.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
    });
    this.container.add(backdrop);

    // Modal Card
    const cardWidth = 600;
    const cardHeight = 480;
    const cardX = width / 2 - cardWidth / 2;
    const cardY = height / 2 - cardHeight / 2;

    const card = this.scene.add.graphics();
    card.fillStyle(0x0e1422, 0.98);
    card.fillRoundedRect(cardX, cardY, cardWidth, cardHeight, 16);
    card.lineStyle(2, 0x00f0ff, 0.8);
    card.strokeRoundedRect(cardX, cardY, cardWidth, cardHeight, 16);
    this.container.add(card);

    // Title
    const title = createCrispText(this.scene, width / 2, cardY + 40, 'HOW TO PLAY', {
      fontSize: '26px',
      color: '#00f0ff',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    this.container.add(title);

    // Instructions lines
    const instructions = [
      { header: '🎮 CONTROLS', text: 'P1: [W] / [S] or [Up] / [Down] (1 Player)\nP2: [Up] / [Down] Arrow keys (2 Players)\nMobile: Tap On-Screen Touch Buttons' },
      { header: '❄️ ICE GLIDE PHYSICS', text: 'Paddles slide on ice! They accelerate smoothly and\ncontinue coasting after releasing keys.' },
      { header: '🎯 ROUNDED CORNERS', text: 'Paddles have curved end caps. Corner hits reflect\nthe ball with steep, unblockable angular cuts!' },
      { header: '✨ ARCADE POWER-UPS', text: 'Hit floating crystals: ❄ Freeze Opponent,\n⇕ Extend Paddle, ⚡ Hyper Speed Boost!' },
    ];

    let startY = cardY + 95;
    for (const item of instructions) {
      const hText = createCrispText(this.scene, cardX + 30, startY, item.header, {
        fontSize: '16px',
        color: '#00f0ff',
        fontStyle: 'bold',
      });
      this.container.add(hText);

      const bText = createCrispText(this.scene, cardX + 30, startY + 22, item.text, {
        fontSize: '14px',
        color: '#cbd5e1',
        lineSpacing: 4,
      });
      this.container.add(bText);

      startY += 68;
    }

    // Close Button
    const closeBtn = this.createButton(
      width / 2,
      cardY + 425,
      'GOT IT',
      () => {
        AudioManager.getInstance().playClick();
        this.hide();
      }
    );
    this.container.add(closeBtn);
  }

  private createButton(
    x: number,
    y: number,
    label: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const btnWidth = 260;
    const btnHeight = 44;

    const bg = this.scene.add.graphics();
    const normalColor = 0x008ba3;
    const hoverColor = 0x00a8c6;
    const borderColor = 0x00f0ff;

    const drawBg = (fill: number) => {
      bg.clear();
      bg.fillStyle(fill, 1);
      bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10);
      bg.lineStyle(1.5, borderColor, 0.9);
      bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10);
    };

    drawBg(normalColor);

    const txt = createCrispText(this.scene, 0, 0, label, {
      fontSize: '16px',
      color: '#ffffff',
    });
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(btnWidth, btnHeight);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      drawBg(hoverColor);
      btn.setScale(1.02);
    });

    btn.on('pointerout', () => {
      drawBg(normalColor);
      btn.setScale(1.0);
    });

    btn.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  public show(): void {
    this.isVisible = true;
    this.container.setVisible(true);
    this.container.setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 150,
      ease: Phaser.Math.Easing.Linear,
    });
  }

  public hide(): void {
    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      duration: 120,
      ease: Phaser.Math.Easing.Linear,
      onComplete: () => {
        this.isVisible = false;
        this.container.setVisible(false);
      },
    });
  }

  public getVisible(): boolean {
    return this.isVisible;
  }
}
