import Phaser from 'phaser';
import { StorageManager } from '../data/StorageManager';
import { AudioManager } from '../audio/AudioManager';
import { createCrispText } from './TextHelper';

export class SettingsModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private isVisible: boolean = false;

  private speedValue: number;
  private speedText!: Phaser.GameObjects.Text;
  private musicBtnText!: Phaser.GameObjects.Text;
  private soundBtnText!: Phaser.GameObjects.Text;

  private onSaveCallback?: (newSpeed: number) => void;

  constructor(scene: Phaser.Scene, onSave?: (newSpeed: number) => void) {
    this.scene = scene;
    this.onSaveCallback = onSave;
    this.speedValue = StorageManager.getSpeedSetting();

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
    const cardWidth = 540;
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
    const title = createCrispText(this.scene, width / 2, cardY + 45, 'SETTINGS', {
      fontSize: '28px',
      color: '#38bdf8',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    this.container.add(title);

    // Speed Section
    const speedLabel = createCrispText(this.scene, width / 2, cardY + 105, 'BALL SPEED', {
      fontSize: '16px',
      color: '#94a3b8',
    });
    speedLabel.setOrigin(0.5);
    this.container.add(speedLabel);

    // Speed Controls: [-] [ VALUE ] [+]
    const speedRowY = cardY + 155;
    const btnMinus = this.createSmallButton(width / 2 - 120, speedRowY, '−', () => {
      if (this.speedValue > 5) {
        this.speedValue -= 1;
        this.updateSpeedUI();
      }
    });

    this.speedText = createCrispText(this.scene, width / 2, speedRowY, `${this.speedValue * 10}`, {
      fontSize: '26px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    this.speedText.setOrigin(0.5);

    const btnPlus = this.createSmallButton(width / 2 + 120, speedRowY, '+', () => {
      if (this.speedValue < 20) {
        this.speedValue += 1;
        this.updateSpeedUI();
      }
    });

    this.container.add([btnMinus, this.speedText, btnPlus]);

    // Audio Section
    const audioRowY = cardY + 235;

    // Music toggle button
    const musicBtn = this.createMediumButton(width / 2 - 110, audioRowY, 'Music: ON', () => {
      AudioManager.getInstance().playClick();
      const on = AudioManager.getInstance().toggleMusic();
      this.musicBtnText.setText(`Music: ${on ? 'ON' : 'OFF'}`);
    });
    this.musicBtnText = musicBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.musicBtnText.setText(`Music: ${AudioManager.getInstance().isMusicOn() ? 'ON' : 'OFF'}`);

    // Sound FX toggle button
    const soundBtn = this.createMediumButton(width / 2 + 110, audioRowY, 'Sound: ON', () => {
      const on = AudioManager.getInstance().toggleSound();
      AudioManager.getInstance().playClick();
      this.soundBtnText.setText(`SFX: ${on ? 'ON' : 'OFF'}`);
    });
    this.soundBtnText = soundBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.soundBtnText.setText(`SFX: ${AudioManager.getInstance().isSoundOn() ? 'ON' : 'OFF'}`);

    this.container.add([musicBtn, soundBtn]);

    // Save & Close Button
    const saveBtnY = cardY + 345;
    const saveBtn = this.createSaveButton(width / 2, saveBtnY, 'SAVE & CLOSE', () => {
      AudioManager.getInstance().playClick();
      StorageManager.saveSpeedSetting(this.speedValue);
      if (this.onSaveCallback) {
        this.onSaveCallback(this.speedValue);
      }
      this.hide();
    });
    this.container.add(saveBtn);
  }

  private updateSpeedUI(): void {
    AudioManager.getInstance().playClick();
    this.speedText.setText(`${this.speedValue * 10}`);
  }

  private createSmallButton(
    x: number,
    y: number,
    label: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const size = 46;

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x1e293b, 1);
    bg.fillRoundedRect(-size / 2, -size / 2, size, size, 10);
    bg.lineStyle(1.5, 0x38bdf8, 0.8);
    bg.strokeRoundedRect(-size / 2, -size / 2, size, size, 10);

    const txt = createCrispText(this.scene, 0, -1, label, {
      fontSize: '24px',
      color: '#38bdf8',
      fontStyle: 'bold',
    });
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(size, size);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  private createMediumButton(
    x: number,
    y: number,
    initialLabel: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const w = 190;
    const h = 48;

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x1e293b, 1);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 12);
    bg.lineStyle(1.5, 0x475569, 0.9);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 12);

    const txt = createCrispText(this.scene, 0, 0, initialLabel, {
      fontSize: '16px',
      color: '#f8fafc',
    });
    txt.setName('btnText');
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

  private createSaveButton(
    x: number,
    y: number,
    label: string,
    onClick: () => void
  ): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const w = 260;
    const h = 50;

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x0284c7, 1);
    bg.fillRoundedRect(-w / 2, -h / 2, w, h, 14);
    bg.lineStyle(2, 0x38bdf8, 1);
    bg.strokeRoundedRect(-w / 2, -h / 2, w, h, 14);

    const txt = createCrispText(this.scene, 0, 0, label, {
      fontSize: '17px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(w, h);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setScale(1.03));
    btn.on('pointerout', () => btn.setScale(1.0));
    btn.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  public show(): void {
    this.speedValue = StorageManager.getSpeedSetting();
    this.speedText.setText(`${this.speedValue * 10}`);
    this.musicBtnText.setText(`Music: ${AudioManager.getInstance().isMusicOn() ? 'ON' : 'OFF'}`);
    this.soundBtnText.setText(`SFX: ${AudioManager.getInstance().isSoundOn() ? 'ON' : 'OFF'}`);

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
