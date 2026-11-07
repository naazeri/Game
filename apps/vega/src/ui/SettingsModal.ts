import Phaser from 'phaser';
import { AudioManager } from '../audio/AudioManager.js';
import { GameSettings, DEFAULT_SETTINGS } from '../config.js';
import { createCrispText } from './TextHelper.js';

export class SettingsModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  public isVisible: boolean = false;
  private settings: GameSettings;
  private onSettingsChanged?: (s: GameSettings) => void;

  private sfxBtnText?: Phaser.GameObjects.Text;
  private musicBtnText?: Phaser.GameObjects.Text;
  private autoFireBtnText?: Phaser.GameObjects.Text;
  private shakeBtnText?: Phaser.GameObjects.Text;
  private laserBtnText?: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, settings: GameSettings, onSettingsChanged?: (s: GameSettings) => void) {
    this.scene = scene;
    this.settings = { ...settings };
    this.onSettingsChanged = onSettingsChanged;

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
    backdrop.fillStyle(0x000000, 0.78);
    backdrop.fillRect(0, 0, width, height);
    backdrop.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    backdrop.on('pointerdown', (e: Phaser.Input.Pointer) => {
      e.event.stopPropagation();
    });
    this.container.add(backdrop);

    // Modal Card
    const cardWidth = 560;
    const cardHeight = 460;
    const cardX = width / 2 - cardWidth / 2;
    const cardY = height / 2 - cardHeight / 2;

    const card = this.scene.add.graphics();
    card.fillStyle(0x0a0f1d, 0.98);
    card.fillRoundedRect(cardX, cardY, cardWidth, cardHeight, 16);
    card.lineStyle(2, 0x00f0ff, 0.85);
    card.strokeRoundedRect(cardX, cardY, cardWidth, cardHeight, 16);
    this.container.add(card);

    // Title
    const title = createCrispText(this.scene, width / 2, cardY + 36, 'SETTINGS', {
      fontSize: '26px',
      color: '#00f0ff',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    this.container.add(title);

    let rowY = cardY + 84;
    const rowStep = 56;
    const btnX = cardX + cardWidth - 140;

    // 1. Sound Effects
    const sfxLabel = createCrispText(this.scene, cardX + 35, rowY, 'SOUND EFFECTS:', {
      fontSize: '15px',
      color: '#ffffff',
    });
    this.container.add(sfxLabel);

    const sfxBtn = this.createOptionButton(btnX, rowY, this.settings.sfxEnabled ? 'ON' : 'OFF', () => {
      AudioManager.getInstance().playClick();
      this.settings.sfxEnabled = !this.settings.sfxEnabled;
      AudioManager.getInstance().setSfxEnabled(this.settings.sfxEnabled);
      this.sfxBtnText?.setText(this.settings.sfxEnabled ? 'ON' : 'OFF');
      this.saveSettings();
    });
    this.sfxBtnText = sfxBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.container.add(sfxBtn);

    // 2. Music
    rowY += rowStep;
    const musicLabel = createCrispText(this.scene, cardX + 35, rowY, 'BACKGROUND MUSIC:', {
      fontSize: '15px',
      color: '#ffffff',
    });
    this.container.add(musicLabel);

    const musicBtn = this.createOptionButton(btnX, rowY, this.settings.musicEnabled ? 'ON' : 'OFF', () => {
      AudioManager.getInstance().playClick();
      this.settings.musicEnabled = !this.settings.musicEnabled;
      AudioManager.getInstance().setMusicEnabled(this.settings.musicEnabled);
      this.musicBtnText?.setText(this.settings.musicEnabled ? 'ON' : 'OFF');
      this.saveSettings();
    });
    this.musicBtnText = musicBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.container.add(musicBtn);

    // 3. Auto Fire
    rowY += rowStep;
    const autoFireLabel = createCrispText(this.scene, cardX + 35, rowY, 'AUTO-FIRE (HOLD MOUSE):', {
      fontSize: '15px',
      color: '#ffffff',
    });
    this.container.add(autoFireLabel);

    const autoFireBtn = this.createOptionButton(btnX, rowY, this.settings.autoFire ? 'ENABLED' : 'MANUAL', () => {
      AudioManager.getInstance().playClick();
      this.settings.autoFire = !this.settings.autoFire;
      this.autoFireBtnText?.setText(this.settings.autoFire ? 'ENABLED' : 'MANUAL');
      this.saveSettings();
    });
    this.autoFireBtnText = autoFireBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.container.add(autoFireBtn);

    // 4. Screen Shake
    rowY += rowStep;
    const shakeLabel = createCrispText(this.scene, cardX + 35, rowY, 'EXPLOSION SCREEN SHAKE:', {
      fontSize: '15px',
      color: '#ffffff',
    });
    this.container.add(shakeLabel);

    const shakeBtn = this.createOptionButton(btnX, rowY, this.settings.screenShake ? 'ON' : 'OFF', () => {
      AudioManager.getInstance().playClick();
      this.settings.screenShake = !this.settings.screenShake;
      this.shakeBtnText?.setText(this.settings.screenShake ? 'ON' : 'OFF');
      this.saveSettings();
    });
    this.shakeBtnText = shakeBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.container.add(shakeBtn);

    // 5. Aim Laser
    rowY += rowStep;
    const laserLabel = createCrispText(this.scene, cardX + 35, rowY, 'AIM TARGETING LASER:', {
      fontSize: '15px',
      color: '#ffffff',
    });
    this.container.add(laserLabel);

    const laserBtn = this.createOptionButton(btnX, rowY, this.settings.aimLaser ? 'VISIBLE' : 'HIDDEN', () => {
      AudioManager.getInstance().playClick();
      this.settings.aimLaser = !this.settings.aimLaser;
      this.laserBtnText?.setText(this.settings.aimLaser ? 'VISIBLE' : 'HIDDEN');
      this.saveSettings();
    });
    this.laserBtnText = laserBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.container.add(laserBtn);

    // Close Button
    const closeBtn = this.createButton(width / 2, cardY + cardHeight - 44, 'APPLY & CLOSE', () => {
      AudioManager.getInstance().playClick();
      this.hide();
    });
    this.container.add(closeBtn);
  }

  private createOptionButton(x: number, y: number, label: string, onClick: () => void): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const btnWidth = 200;
    const btnHeight = 36;

    const bg = this.scene.add.graphics();
    const drawBg = (hover: boolean) => {
      bg.clear();
      bg.fillStyle(hover ? 0x223254 : 0x162035, 1);
      bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8);
      bg.lineStyle(1.5, hover ? 0x00f0ff : 0x3d5480, 0.9);
      bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 8);
    };

    drawBg(false);

    const txt = createCrispText(this.scene, 0, 0, label, {
      fontSize: '13px',
      color: '#00f0ff',
      fontStyle: 'bold',
    });
    txt.setName('btnText');
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(btnWidth, btnHeight);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      drawBg(true);
      btn.setScale(1.02);
    });

    btn.on('pointerout', () => {
      drawBg(false);
      btn.setScale(1.0);
    });

    btn.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  private createButton(x: number, y: number, label: string, onClick: () => void): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const btnWidth = 260;
    const btnHeight = 42;

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x008ba3, 1);
    bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10);
    bg.lineStyle(1.5, 0x00f0ff, 0.9);
    bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10);

    const txt = createCrispText(this.scene, 0, 0, label, {
      fontSize: '15px',
      color: '#ffffff',
      fontStyle: 'bold',
    });
    txt.setOrigin(0.5);

    btn.add([bg, txt]);
    btn.setSize(btnWidth, btnHeight);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => btn.setScale(1.02));
    btn.on('pointerout', () => btn.setScale(1.0));
    btn.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      onClick();
    });

    return btn;
  }

  private saveSettings(): void {
    try {
      localStorage.setItem('vega_settings', JSON.stringify(this.settings));
    } catch {
      // ignore
    }
    this.onSettingsChanged?.(this.settings);
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
