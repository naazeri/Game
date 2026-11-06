import Phaser from 'phaser';
import { StorageManager } from '../data/StorageManager';

export class AudioManager {
  private static instance: AudioManager;
  private soundManager?: Phaser.Sound.BaseSoundManager;
  private currentBgm?: Phaser.Sound.BaseSound;
  private currentBgmKey?: string;

  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;

  private constructor() {
    this.soundEnabled = StorageManager.isSoundEnabled();
    this.musicEnabled = StorageManager.isMusicEnabled();
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public init(soundManager: Phaser.Sound.BaseSoundManager): void {
    this.soundManager = soundManager;
  }

  public playMenuMusic(): void {
    this.playBgm('bgm_menu', 0.45);
  }

  public playGameMusic(): void {
    this.playBgm('bgm_game', 0.5);
  }

  public stopMusic(): void {
    if (this.currentBgm && this.currentBgm.isPlaying) {
      this.currentBgm.stop();
    }
    this.currentBgmKey = undefined;
  }

  private playBgm(key: string, volume: number): void {
    if (!this.soundManager) return;
    if (this.currentBgmKey === key && this.currentBgm && this.currentBgm.isPlaying) {
      return;
    }

    this.stopMusic();

    if (!this.musicEnabled) {
      this.currentBgmKey = key;
      return;
    }

    try {
      this.currentBgm = this.soundManager.add(key, {
        loop: true,
        volume: volume,
      });
      this.currentBgm.play();
      this.currentBgmKey = key;
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  public toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    StorageManager.setMusicEnabled(this.musicEnabled);

    if (this.musicEnabled) {
      if (this.currentBgmKey) {
        this.playBgm(this.currentBgmKey, this.currentBgmKey === 'bgm_menu' ? 0.45 : 0.5);
      }
    } else {
      if (this.currentBgm && this.currentBgm.isPlaying) {
        this.currentBgm.stop();
      }
    }
    return this.musicEnabled;
  }

  public isMusicOn(): boolean {
    return this.musicEnabled;
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    StorageManager.setSoundEnabled(this.soundEnabled);
    return this.soundEnabled;
  }

  public isSoundOn(): boolean {
    return this.soundEnabled;
  }

  public playRotate(): void {
    if (!this.soundEnabled || !this.soundManager) return;
    try {
      this.soundManager.play('rotate', { volume: 0.65 });
    } catch {
      // ignore
    }
  }

  public playMatch(score: number = 0): void {
    if (!this.soundEnabled || !this.soundManager) return;
    try {
      // Step up pitch every 4 bounces in musical scale intervals
      const pitchSteps = [1.0, 1.08, 1.15, 1.25, 1.35, 1.45, 1.55, 1.65];
      const tier = Math.floor(score / 4);
      const rate = pitchSteps[Math.min(tier, pitchSteps.length - 1)];

      this.soundManager.play('match', { volume: 0.75, rate });
    } catch {
      // ignore
    }
  }

  public playTierUp(): void {
    if (!this.soundEnabled || !this.soundManager) return;
    try {
      this.soundManager.play('color_switch', { volume: 0.85, rate: 1.2 });
    } catch {
      // ignore
    }
  }

  public playHeartUp(): void {
    if (!this.soundEnabled || !this.soundManager) return;
    try {
      this.soundManager.play('heart_up', { volume: 0.9 });
    } catch {
      // ignore
    }
  }

  public playHeartBreak(): void {
    if (!this.soundEnabled || !this.soundManager) return;
    try {
      this.soundManager.play('heart_break', { volume: 0.95 });
    } catch {
      // ignore
    }
  }

  public playColorSwitch(): void {
    if (!this.soundEnabled || !this.soundManager) return;
    try {
      this.soundManager.play('color_switch', { volume: 0.7 });
    } catch {
      // ignore
    }
  }

  public playGameOver(): void {
    if (!this.soundEnabled || !this.soundManager) return;
    try {
      this.soundManager.play('game_over', { volume: 0.85 });
    } catch {
      // ignore
    }
  }

  public playClick(): void {
    if (!this.soundEnabled || !this.soundManager) return;
    try {
      this.soundManager.play('ui_click', { volume: 0.5 });
    } catch {
      // ignore
    }
  }
}
