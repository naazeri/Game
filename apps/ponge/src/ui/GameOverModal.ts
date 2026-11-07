import Phaser from 'phaser';
import { AudioManager } from '../audio/AudioManager.js';
import { createCrispText } from './TextHelper.js';

export class GameOverModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private isVisible: boolean = false;

  private onPlayAgain: () => void;
  private onMainMenu: () => void;

  private winnerText?: Phaser.GameObjects.Text;
  private statsText?: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, onPlayAgain: () => void, onMainMenu: () => void) {
    this.scene = scene;
    this.onPlayAgain = onPlayAgain;
    this.onMainMenu = onMainMenu;

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
    backdrop.fillStyle(0x000000, 0.8);
    backdrop.fillRect(0, 0, width, height);
    backdrop.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    this.container.add(backdrop);

    // Modal Card
    const cardWidth = 540;
    const cardHeight = 400;
    const cardX = width / 2 - cardWidth / 2;
    const cardY = height / 2 - cardHeight / 2;

    const card = this.scene.add.graphics();
    card.fillStyle(0x0e1422, 0.98);
    card.fillRoundedRect(cardX, cardY, cardWidth, cardHeight, 16);
    card.lineStyle(2, 0x00f0ff, 0.8);
    card.strokeRoundedRect(cardX, cardY, cardWidth, cardHeight, 16);
    this.container.add(card);

    // Title
    const title = createCrispText(this.scene, width / 2, cardY + 45, 'MATCH FINISHED', {
      fontSize: '26px',
      color: '#00f0ff',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    this.container.add(title);

    // Winner announcement
    this.winnerText = createCrispText(this.scene, width / 2, cardY + 110, 'PLAYER 1 WINS!', {
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    this.winnerText.setOrigin(0.5);
    this.container.add(this.winnerText);

    // Stats
    this.statsText = createCrispText(this.scene, width / 2, cardY + 175, 'Score: 5 - 3\nMax Rally: 14 hits', {
      fontSize: '17px',
      color: '#94a3b8',
      align: 'center',
      lineSpacing: 8,
    });
    this.statsText.setOrigin(0.5);
    this.container.add(this.statsText);

    // Play Again Button
    const playAgainBtn = this.createButton(width / 2, cardY + 260, 'PLAY AGAIN', () => {
      AudioManager.getInstance().playClick();
      this.hide();
      this.onPlayAgain();
    }, true);
    this.container.add(playAgainBtn);

    // Main Menu Button
    const menuBtn = this.createButton(width / 2, cardY + 330, 'MAIN MENU', () => {
      AudioManager.getInstance().playClick();
      this.hide();
      this.onMainMenu();
    }, false);
    this.container.add(menuBtn);
  }

  private createButton(
    x: number,
    y: number,
    label: string,
    onClick: () => void,
    isPrimary: boolean = false
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const btnWidth = 320;
    const btnHeight = 48;

    const bg = this.scene.add.graphics();
    const normalColor = isPrimary ? 0x008ba3 : 0x162035;
    const hoverColor = isPrimary ? 0x00a8c6 : 0x223254;
    const borderColor = isPrimary ? 0x00f0ff : 0x3d5480;

    const drawBg = (fill: number) => {
      bg.clear();
      bg.fillStyle(fill, 1);
      bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10);
      bg.lineStyle(1.5, borderColor, 0.9);
      bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10);
    };

    drawBg(normalColor);

    const txt = createCrispText(this.scene, 0, 0, label, {
      fontSize: '17px',
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

  public show(winner: string, p1Score: number, p2Score: number, maxRally: number): void {
    let bestRally = 0;
    try {
      const saved = localStorage.getItem('ponge_best_rally');
      if (saved) {
        bestRally = parseInt(saved, 10) || 0;
      }
    } catch {
      // ignore
    }

    let isNewRecord = false;
    if (maxRally > bestRally) {
      bestRally = maxRally;
      isNewRecord = true;
      try {
        localStorage.setItem('ponge_best_rally', String(bestRally));
      } catch {
        // ignore
      }
    }

    this.winnerText?.setText(winner);

    const recordNote = isNewRecord && maxRally > 0 ? ' ⭐ NEW PERSONAL RECORD! ⭐\n' : '';
    this.statsText?.setText(
      `${recordNote}Final Score: ${p1Score} - ${p2Score}\nMatch Rally: ${maxRally} hits  •  Best Rally: ${bestRally} hits`
    );

    this.isVisible = true;
    this.container.setVisible(true);
    this.container.setAlpha(0);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 200,
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
