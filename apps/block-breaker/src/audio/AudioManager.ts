import Phaser from 'phaser';
import { GameSettings, DEFAULT_SETTINGS, COMBO_CONFIG } from '../config.js';

export class AudioManager {
  private static instance: AudioManager | null = null;
  private ctx: AudioContext | null = null;
  private settings: GameSettings = { ...DEFAULT_SETTINGS };
  private isBgmPlaying = false;
  private bgmTimer: number | null = null;
  private currentScene: Phaser.Scene | null = null;

  private constructor() {
    this.loadSettings();
    this.initAudioContext();
  }

  public static getInstance(scene?: Phaser.Scene): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    if (scene) {
      AudioManager.instance.currentScene = scene;
    }
    return AudioManager.instance;
  }

  private initAudioContext(): void {
    if (typeof window === 'undefined') return;

    const resume = () => {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('keydown', resume);
    };

    window.addEventListener('pointerdown', resume);
    window.addEventListener('keydown', resume);
  }

  private ensureContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getSettings(): GameSettings {
    return { ...this.settings };
  }

  public updateSettings(partial: Partial<GameSettings>): void {
    this.settings = { ...this.settings, ...partial };
    this.saveSettings();
    if (this.settings.musicMuted && this.isBgmPlaying) {
      this.stopBgm();
    } else if (!this.settings.musicMuted && !this.isBgmPlaying) {
      this.playBgm();
    }
  }

  private loadSettings(): void {
    try {
      const saved = localStorage.getItem('blockbreaker_audio_settings');
      if (saved) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      this.settings = { ...DEFAULT_SETTINGS };
    }
  }

  private saveSettings(): void {
    try {
      localStorage.setItem('blockbreaker_audio_settings', JSON.stringify(this.settings));
    } catch {
      // Ignored
    }
  }

  // ==========================================
  // PROCEDURAL SOUND EFFECTS
  // ==========================================

  public playWallBounce(): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);

    gain.gain.setValueAtTime(0.22 * this.settings.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.065);
  }

  public playPaddleHit(deflectionFactor: number = 0): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Frequency shifts slightly depending on deflection angle
    const baseFreq = 140 + Math.abs(deflectionFactor) * 80;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.09);

    gain.gain.setValueAtTime(0.35 * this.settings.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playBlockHit(combo: number = 0): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const notes = COMBO_CONFIG.musicalNotes;
    const noteIdx = Math.min(notes.length - 1, Math.max(0, combo));
    const freq = notes[noteIdx];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 0.04);

    gain.gain.setValueAtTime(0.3 * this.settings.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playBlockShatter(): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Noise burst for shatter
    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    filter.Q.value = 3.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35 * this.settings.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.13);
  }

  public playBombExplosion(): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.35);

    gain.gain.setValueAtTime(0.48 * this.settings.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  public playLaserShot(): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);

    gain.gain.setValueAtTime(0.22 * this.settings.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.11);
  }

  public playPowerUpCollect(): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const arpeggio = [261.63, 329.63, 392.00, 523.25]; // C, E, G, High C

    arpeggio.forEach((f, idx) => {
      const t = now + idx * 0.045;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0.25 * this.settings.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.085);
    });
  }

  public playBallLost(): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.32);

    gain.gain.setValueAtTime(0.3 * this.settings.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.33);
  }

  public playStageClear(): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const fanfares = [
      { f: 392.00, d: 0.10 }, // G4
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.14 }, // E5
      { f: 783.99, d: 0.28 }, // G5
    ];

    let t = now;
    fanfares.forEach(({ f, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0.35 * this.settings.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + d + 0.01);

      t += d * 0.85;
    });
  }

  public playGameOver(): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [293.66, 277.18, 261.63, 220.00]; // D4 -> C#4 -> C4 -> A3

    notes.forEach((f, idx) => {
      const t = now + idx * 0.14;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0.28 * this.settings.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.23);
    });
  }

  public playVictory(): void {
    if (this.settings.sfxMuted || this.settings.sfxVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // C4, E4, G4, C5, E5, G5, High C6
    const fanfare = [
      { f: 261.63, d: 0.12 },
      { f: 329.63, d: 0.12 },
      { f: 392.00, d: 0.14 },
      { f: 523.25, d: 0.16 },
      { f: 659.25, d: 0.18 },
      { f: 783.99, d: 0.22 },
      { f: 1046.5, d: 0.45 },
    ];

    let t = now;
    fanfare.forEach(({ f, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0.35 * this.settings.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + d + 0.01);

      t += d * 0.78;
    });
  }

  // ==========================================
  // PROCEDURAL SYNTHWAVE BGM
  // ==========================================

  public playBgm(): void {
    if (this.isBgmPlaying || this.settings.musicMuted || this.settings.musicVolume <= 0) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    this.isBgmPlaying = true;
    this.scheduleBgmLoop();
  }

  public stopBgm(): void {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      window.clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  private scheduleBgmLoop(): void {
    if (!this.isBgmPlaying) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    // 8-step bass synth pattern in A minor (A2, C3, D3, E3, G2, A2, C3, B2)
    const pattern = [110.00, 130.81, 146.83, 164.81, 98.00, 110.00, 130.81, 123.47];
    const stepDuration = 0.24; // 125 BPM 16th/8th rhythm
    const now = ctx.currentTime + 0.05;

    pattern.forEach((freq, i) => {
      const t = now + i * stepDuration;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, t + stepDuration * 0.8);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, t);
      filter.frequency.exponentialRampToValueAtTime(220, t + stepDuration * 0.85);

      const vol = 0.09 * this.settings.musicVolume;
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + stepDuration * 0.85);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + stepDuration * 0.9);
    });

    const loopMs = pattern.length * stepDuration * 1000;
    this.bgmTimer = window.setTimeout(() => {
      this.scheduleBgmLoop();
    }, loopMs);
  }
}
