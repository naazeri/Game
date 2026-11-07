import Phaser from 'phaser';
import { AudioManager } from '../audio/AudioManager.js';
import {
  MatchSettings,
  AIDifficulty,
  AI_BOT_PROFILES,
  GameStyle,
  GameTheme,
  GAME_THEMES,
} from '../config.js';
import { createCrispText } from './TextHelper.js';

export class SettingsModal {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private isVisible: boolean = false;
  private settings: MatchSettings;
  private onSettingsChanged?: (s: MatchSettings) => void;

  private styleBtnText?: Phaser.GameObjects.Text;
  private themeBtnText?: Phaser.GameObjects.Text;
  private diffBtnText?: Phaser.GameObjects.Text;
  private scoreBtnText?: Phaser.GameObjects.Text;
  private sfxBtnText?: Phaser.GameObjects.Text;
  private musicBtnText?: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, settings: MatchSettings, onSettingsChanged?: (s: MatchSettings) => void) {
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
    const cardHeight = 490;
    const cardX = width / 2 - cardWidth / 2;
    const cardY = height / 2 - cardHeight / 2;

    const card = this.scene.add.graphics();
    card.fillStyle(0x0e1422, 0.98);
    card.fillRoundedRect(cardX, cardY, cardWidth, cardHeight, 16);
    card.lineStyle(2, 0x00f0ff, 0.85);
    card.strokeRoundedRect(cardX, cardY, cardWidth, cardHeight, 16);
    this.container.add(card);

    // Title
    const title = createCrispText(this.scene, width / 2, cardY + 34, 'SETTINGS', {
      fontFamily: 'VCR_OSD_MONO',
      fontSize: '26px',
      color: '#00f0ff',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    this.container.add(title);

    let rowY = cardY + 76;
    const rowStep = 52;
    const btnX = cardX + cardWidth - 145;

    // 1. Game Style (Arcade vs Classic)
    const styleLabel = createCrispText(this.scene, cardX + 35, rowY, 'GAME STYLE:', {
      fontSize: '15px',
      color: '#ffffff',
    });
    this.container.add(styleLabel);

    const styleDisplay = this.settings.style === GameStyle.Arcade ? 'ARCADE (POWER-UPS)' : 'CLASSIC (PURE)';
    const styleBtn = this.createOptionButton(btnX, rowY, styleDisplay, () => {
      AudioManager.getInstance().playClick();
      this.settings.style = this.settings.style === GameStyle.Arcade ? GameStyle.Classic : GameStyle.Arcade;
      this.styleBtnText?.setText(this.settings.style === GameStyle.Arcade ? 'ARCADE (POWER-UPS)' : 'CLASSIC (PURE)');
      this.saveSettings();
    });
    this.styleBtnText = styleBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.container.add(styleBtn);

    // 2. Color Theme
    rowY += rowStep;
    const themeLabel = createCrispText(this.scene, cardX + 35, rowY, 'COLOR THEME:', {
      fontSize: '15px',
      color: '#ffffff',
    });
    this.container.add(themeLabel);

    const themeThemes = [GameTheme.CyberNeon, GameTheme.PureIce, GameTheme.RetroAtari, GameTheme.Synthwave];
    const themeBtn = this.createOptionButton(btnX, rowY, GAME_THEMES[this.settings.theme].name, () => {
      AudioManager.getInstance().playClick();
      const currentIdx = themeThemes.indexOf(this.settings.theme);
      const nextIdx = (currentIdx + 1) % themeThemes.length;
      this.settings.theme = themeThemes[nextIdx];
      this.themeBtnText?.setText(GAME_THEMES[this.settings.theme].name);
      this.saveSettings();
    });
    this.themeBtnText = themeBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.container.add(themeBtn);

    // 3. AI Difficulty
    rowY += rowStep;
    const diffLabel = createCrispText(this.scene, cardX + 35, rowY, 'AI DIFFICULTY:', {
      fontSize: '15px',
      color: '#ffffff',
    });
    this.container.add(diffLabel);

    const diffs = [AIDifficulty.Casual, AIDifficulty.Normal, AIDifficulty.Pro];
    const diffBtn = this.createOptionButton(btnX, rowY, this.settings.aiDifficulty.toUpperCase(), () => {
      AudioManager.getInstance().playClick();
      const nextIdx = (diffs.indexOf(this.settings.aiDifficulty) + 1) % diffs.length;
      this.settings.aiDifficulty = diffs[nextIdx];
      this.diffBtnText?.setText(this.settings.aiDifficulty.toUpperCase());
      this.saveSettings();
    });
    this.diffBtnText = diffBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.container.add(diffBtn);

    // 4. Target Score Setting
    rowY += rowStep;
    const scoreLabel = createCrispText(this.scene, cardX + 35, rowY, 'TARGET SCORE:', {
      fontSize: '15px',
      color: '#ffffff',
    });
    this.container.add(scoreLabel);

    const scoreDisplay = this.settings.targetScore === 0 ? 'ENDLESS' : `${this.settings.targetScore} PTS`;
    const scoreBtn = this.createOptionButton(btnX, rowY, scoreDisplay, () => {
      AudioManager.getInstance().playClick();
      const options = [5, 7, 10, 0];
      const nextIdx = (options.indexOf(this.settings.targetScore) + 1) % options.length;
      this.settings.targetScore = options[nextIdx];
      this.scoreBtnText?.setText(this.settings.targetScore === 0 ? 'ENDLESS' : `${this.settings.targetScore} PTS`);
      this.saveSettings();
    });
    this.scoreBtnText = scoreBtn.getByName('btnText') as Phaser.GameObjects.Text;
    this.container.add(scoreBtn);

    // 5. Sound Effects
    rowY += rowStep;
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

    // 6. Music
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

    // Close Button
    const closeBtn = this.createButton(width / 2, cardY + cardHeight - 42, 'APPLY & CLOSE', () => {
      AudioManager.getInstance().playClick();
      this.hide();
    });
    this.container.add(closeBtn);
  }

  private createOptionButton(x: number, y: number, label: string, onClick: () => void): Phaser.GameObjects.Container {
    const btn = this.scene.add.container(x, y);
    const btnWidth = 220;
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
    const btnWidth = 240;
    const btnHeight = 40;

    const bg = this.scene.add.graphics();
    bg.fillStyle(0x008ba3, 1);
    bg.fillRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10);
    bg.lineStyle(1.5, 0x00f0ff, 0.9);
    bg.strokeRoundedRect(-btnWidth / 2, -btnHeight / 2, btnWidth, btnHeight, 10);

    const txt = createCrispText(this.scene, 0, 0, label, {
      fontSize: '15px',
      color: '#ffffff',
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
      localStorage.setItem('ponge_settings', JSON.stringify(this.settings));
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
