import Phaser from 'phaser';
import { StorageManager } from '../data/StorageManager';
import { AudioManager } from '../audio/AudioManager';
import { createCrispText } from './TextHelper';

export class StatsModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private isVisible: boolean = false;

  private onePlayerText!: Phaser.GameObjects.Text;
  private twoPlayerText!: Phaser.GameObjects.Text;
  private gamesPlayedText!: Phaser.GameObjects.Text;

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
    const cardWidth = 520;
    const cardHeight = 390;
    const cardX = width / 2 - cardWidth / 2;
    const cardY = height / 2 - cardHeight / 2;

    const card = this.scene.add.graphics();
    card.fillStyle(0x131927, 0.96);
    card.fillRoundedRect(cardX, cardY, cardWidth, cardHeight, 20);
    card.lineStyle(2, 0x38bdf8, 0.7);
    card.strokeRoundedRect(cardX, cardY, cardWidth, cardHeight, 20);
    this.container.add(card);

    // Title
    const title = createCrispText(this.scene, width / 2, cardY + 45, 'STATISTICS', {
      fontSize: '28px',
      color: '#38bdf8',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    this.container.add(title);

    // Stats items
    const startY = cardY + 115;
    const rowGap = 58;

    // 1 Player
    this.onePlayerText = this.createStatRow(width / 2, startY, '1 PLAYER BEST', '0');
    // 2 Player
    this.twoPlayerText = this.createStatRow(width / 2, startY + rowGap, '2 PLAYERS BEST', '0');
    // Games played
    this.gamesPlayedText = this.createStatRow(width / 2, startY + rowGap * 2, 'GAMES PLAYED', '0');

    // Close Button
    const closeBtnY = cardY + 315;
    const closeBtn = this.createCloseButton(width / 2, closeBtnY, 'CLOSE', () => {
      AudioManager.getInstance().playClick();
      this.hide();
    });
    this.container.add(closeBtn);
  }

  private createStatRow(
    x: number,
    y: number,
    label: string,
    initialVal: string
  ): Phaser.GameObjects.Text {
    const rowW = 420;
    const rowH = 46;

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x1e293b, 0.6);
    bg.fillRoundedRect(x - rowW / 2, y - rowH / 2, rowW, rowH, 10);
    bg.lineStyle(1, 0x334155, 0.8);
    bg.strokeRoundedRect(x - rowW / 2, y - rowH / 2, rowW, rowH, 10);
    this.container.add(bg);

    const lbl = createCrispText(this.scene, x - rowW / 2 + 20, y, label, {
      fontSize: '15px',
      color: '#94a3b8',
    });
    lbl.setOrigin(0, 0.5);
    this.container.add(lbl);

    const val = createCrispText(this.scene, x + rowW / 2 - 20, y, initialVal, {
      fontSize: '20px',
      color: '#f8fafc',
      fontStyle: 'bold',
    });
    val.setOrigin(1, 0.5);
    this.container.add(val);

    return val;
  }

  private createCloseButton(
    x: number,
    y: number,
    label: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const w = 240;
    const h = 46;

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x0284c7, 1);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);
    bg.lineStyle(1.5, 0x38bdf8, 1);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 12);

    const txt = createCrispText(this.scene, 0, 0, label, {
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(w, h);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  public show(): void {
    const bso = StorageManager.getBestScore('onePlayer');
    const bst = StorageManager.getBestScore('twoPlayer');
    const total = StorageManager.getGamesPlayed();

    this.onePlayerText.setText(bso.toString());
    this.twoPlayerText.setText(bst.toString());
    this.gamesPlayedText.setText(total.toString());

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
