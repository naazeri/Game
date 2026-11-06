import Phaser from 'phaser';
import { DEVELOPER_INFO } from '@games/shared';
import { AudioManager } from '../audio/AudioManager';
import { createCrispText } from './TextHelper';

export class AboutModal {
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
    backdrop.fillStyle(0x000000, 0.7);
    backdrop.fillRect(0, 0, width, height);
    backdrop.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    backdrop.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
    });
    this.container.add(backdrop);

    // Modal Card
    const cardWidth = 560;
    const cardHeight = 440;
    const cardX = width / 2 - cardWidth / 2;
    const cardY = height / 2 - cardHeight / 2;

    const card = this.scene.add.graphics();
    card.fillStyle(0x131927, 0.96);
    card.fillRoundedRect(cardX, cardY, cardWidth, cardHeight, 20);
    card.lineStyle(2, 0x38bdf8, 0.7);
    card.strokeRoundedRect(cardX, cardY, cardWidth, cardHeight, 20);
    this.container.add(card);

    // Title
    const title = createCrispText(this.scene, width / 2, cardY + 45, 'ABOUT & CREDITS', {
      fontSize: '28px',
      color: '#38bdf8',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    this.container.add(title);

    // Developer name (English only)
    const devName = createCrispText(this.scene, width / 2, cardY + 105, DEVELOPER_INFO.name, {
      fontSize: '22px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    devName.setOrigin(0.5);
    this.container.add(devName);

    // Version
    const versionText = createCrispText(this.scene, width / 2, cardY + 148, 'Version: 2.0.0', {
      fontSize: '15px',
      color: '#38bdf8',
    });
    versionText.setOrigin(0.5);
    this.container.add(versionText);

    // Website Button
    const webBtnY = cardY + 220;
    const webBtn = this.createButton(
      width / 2,
      webBtnY,
      `🌐  ${DEVELOPER_INFO.websiteDisplay}`,
      () => {
        AudioManager.getInstance().playClick();
        window.open(DEVELOPER_INFO.websiteUrl, '_blank');
      }
    );
    this.container.add(webBtn);

    // Portal Button
    const portalBtnY = cardY + 285;
    const portalBtn = this.createButton(
      width / 2,
      portalBtnY,
      '🎮  More Games (game.nazeriland.ir)',
      () => {
        AudioManager.getInstance().playClick();
        window.open(DEVELOPER_INFO.portalUrl, '_blank');
      }
    );
    this.container.add(portalBtn);

    // Close Button
    const closeBtnY = cardY + 365;
    const closeBtn = this.createButton(
      width / 2,
      closeBtnY,
      'CLOSE',
      () => {
        AudioManager.getInstance().playClick();
        this.hide();
      },
      true
    );
    this.container.add(closeBtn);
  }

  private createButton(
    x: number,
    y: number,
    label: number | string,
    onClick: () => void,
    isPrimary: boolean = false
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const btnWidth = 380;
    const btnHeight = 48;

    const bg = this.scene.add.graphics();
    const normalColor = isPrimary ? 0x0284c7 : 0x1e293b;
    const hoverColor = isPrimary ? 0x0369a1 : 0x334155;
    const borderColor = isPrimary ? 0x38bdf8 : 0x475569;

    const drawBg = (fill: number) => {
      bg.clear();
      bg.fillStyle(fill, 1);
      bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 12);
      bg.lineStyle(1.5, borderColor, 0.9);
      bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 12);
    };

    drawBg(normalColor);

    const txt = createCrispText(this.scene, 0, 0, String(label), {
      fontSize: '17px',
      color: '#f8fafc',
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
