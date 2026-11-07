import Phaser from 'phaser';

export class AudioManager {
  private static instance: AudioManager;
  private scene?: Phaser.Scene;
  private sfxEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private bgmMusic?: Phaser.Sound.BaseSound;
  private audioContext?: AudioContext;

  private constructor() {
    // Singleton
  }

  public static getInstance(scene?: Phaser.Scene): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    if (scene) {
      AudioManager.instance.init(scene);
    }
    return AudioManager.instance;
  }

  public init(scene: Phaser.Scene): void {
    this.scene = scene;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx && !this.audioContext) {
      this.audioContext = new AudioCtx();
    }
  }

  public isSoundMuted(): boolean {
    return !this.sfxEnabled;
  }

  public setSoundMuted(muted: boolean): void {
    this.sfxEnabled = !muted;
  }

  public playBgm(): void {
    this.playMusic();
  }

  public playRailgunEffect(): void {
    this.playRailgun();
  }

  public playMissileEffect(): void {
    this.playMissileLaunch();
  }

  public playEmpEffect(): void {
    this.playEmpBomb();
  }

  public playPowerUpSound(): void {
    this.playPowerUp();
  }

  public play(name: string, config?: Phaser.Types.Sound.SoundConfig): void {
    if (!this.sfxEnabled || !this.scene) return;
    try {
      this.scene.sound.play(name, config);
    } catch {
      // Fallback
    }
  }

  public setSfxEnabled(val: boolean): void {
    this.sfxEnabled = val;
  }

  public isSfxEnabled(): boolean {
    return this.sfxEnabled;
  }

  public setMusicEnabled(val: boolean): void {
    this.musicEnabled = val;
    if (!val) {
      this.stopMusic();
    } else {
      this.playMusic();
    }
  }

  public isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  public playMusic(): void {
    if (!this.musicEnabled || !this.scene) return;
    try {
      if (!this.bgmMusic) {
        this.bgmMusic = this.scene.sound.add('bgm', {
          loop: true,
          volume: 0.65,
        });
      }
      if (!this.bgmMusic.isPlaying) {
        this.bgmMusic.play();
      }
    } catch {
      // Audio not yet unlocked
    }
  }

  public stopMusic(): void {
    if (this.bgmMusic && this.bgmMusic.isPlaying) {
      this.bgmMusic.stop();
    }
  }

  public playShoot(): void {
    if (!this.sfxEnabled || !this.scene) return;
    try {
      this.scene.sound.play('shoot', { volume: 0.5 });
    } catch {
      this.playSynthBlip(880, 0.05, 'triangle', 0.2);
    }
  }

  public playEnemyHit(): void {
    if (!this.sfxEnabled || !this.scene) return;
    try {
      this.scene.sound.play('enemyHit', { volume: 0.6 });
    } catch {
      this.playSynthBlip(220, 0.06, 'square', 0.25);
    }
  }

  public playEnemyEliminated(): void {
    if (!this.sfxEnabled || !this.scene) return;
    try {
      this.scene.sound.play('enemyEliminated', { volume: 0.75 });
    } catch {
      this.playSynthExplosion();
    }
  }

  public playStartGame(): void {
    if (!this.sfxEnabled || !this.scene) return;
    try {
      this.scene.sound.play('startGame', { volume: 0.8 });
    } catch {
      this.playSynthBlip(520, 0.15, 'sine');
    }
  }

  public playEndGame(): void {
    if (!this.sfxEnabled || !this.scene) return;
    try {
      this.scene.sound.play('endGame', { volume: 0.85 });
    } catch {
      this.playSynthBlip(180, 0.4, 'sawtooth');
    }
  }

  public playRailgun(): void {
    if (!this.sfxEnabled) return;
    this.playSynthBlip(1200, 0.15, 'sawtooth', 0.35);
    setTimeout(() => this.playSynthBlip(300, 0.2, 'sine', 0.4), 40);
  }

  public playMissileLaunch(): void {
    if (!this.sfxEnabled) return;
    this.playSynthBlip(440, 0.1, 'triangle', 0.25);
  }

  public playShieldCrack(): void {
    if (!this.sfxEnabled) return;
    this.playSynthBlip(180, 0.25, 'sawtooth', 0.45);
    setTimeout(() => this.playSynthBlip(90, 0.35, 'square', 0.4), 80);
  }

  public playShieldRestore(): void {
    if (!this.sfxEnabled) return;
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playSynthBlip(freq, 0.14, 'triangle', 0.28), idx * 60);
    });
  }

  public playPowerUp(): void {
    if (!this.sfxEnabled) return;
    const notes = [587, 740, 880, 1174];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playSynthBlip(freq, 0.12, 'sine', 0.3), idx * 50);
    });
  }

  public playEmpBomb(): void {
    if (!this.sfxEnabled) return;
    // Deep thunder shockwave
    this.playSynthBlip(90, 0.6, 'sawtooth', 0.6);
    this.playSynthBlip(60, 0.8, 'sine', 0.7);
  }

  public playComboMilestone(multiplier: number): void {
    if (!this.sfxEnabled) return;
    const baseFreq = 440 + multiplier * 120;
    this.playSynthBlip(baseFreq, 0.15, 'triangle', 0.35);
    setTimeout(() => this.playSynthBlip(baseFreq * 1.25, 0.2, 'sine', 0.35), 70);
  }

  public playClick(): void {
    if (!this.sfxEnabled) return;
    this.playSynthBlip(600, 0.04, 'sine', 0.2);
  }

  private playSynthBlip(
    freq: number,
    dur: number,
    type: OscillatorType = 'sine',
    vol: number = 0.3
  ): void {
    if (!this.audioContext) return;
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    try {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
      gain.gain.setValueAtTime(vol, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + dur);
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();
      osc.stop(this.audioContext.currentTime + dur);
    } catch {
      // Audio context error
    }
  }

  private playSynthExplosion(): void {
    this.playSynthBlip(120, 0.3, 'sawtooth', 0.4);
    setTimeout(() => this.playSynthBlip(60, 0.25, 'sine', 0.35), 60);
  }
}
