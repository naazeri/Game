export class AudioManager {
  private static instance: AudioManager;
  private scene?: Phaser.Scene;
  private sfxEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private audioContext?: AudioContext;
  private musicTimer?: number;
  private currentTrack?: 'menu' | 'game' | null = null;

  private constructor() {
    // Singleton
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public init(scene: Phaser.Scene): void {
    this.scene = scene;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx && !this.audioContext) {
      this.audioContext = new AudioCtx();
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
    } else if (this.currentTrack) {
      this.playMusic(this.currentTrack);
    }
  }

  public isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  public playPaddleBounce(): void {
    if (!this.sfxEnabled || !this.scene) return;
    try {
      this.scene.sound.play('bounce1', { volume: 0.85 });
    } catch {
      this.playSynthBlip(320, 0.08, 'triangle');
    }
  }

  public playWallBounce(): void {
    if (!this.sfxEnabled || !this.scene) return;
    try {
      this.scene.sound.play('bounce2', { volume: 0.65 });
    } catch {
      this.playSynthBlip(220, 0.07, 'sine');
    }
  }

  public playScoreExplosion(): void {
    if (!this.sfxEnabled || !this.scene) return;
    try {
      this.scene.sound.play('explosion', { volume: 0.9 });
    } catch {
      this.playSynthExplosion();
    }
  }

  public playClick(): void {
    if (!this.sfxEnabled) return;
    this.playSynthBlip(580, 0.04, 'sine', 0.2);
  }

  public playServeChime(): void {
    if (!this.sfxEnabled) return;
    this.playSynthBlip(660, 0.12, 'triangle', 0.25);
  }

  public playPowerUpSpawn(): void {
    if (!this.sfxEnabled) return;
    this.playSynthBlip(480, 0.08, 'sine', 0.2);
    setTimeout(() => this.playSynthBlip(720, 0.12, 'triangle', 0.25), 60);
  }

  public playPowerUpCollect(): void {
    if (!this.sfxEnabled) return;
    const notes = [523, 659, 784, 1046]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playSynthBlip(freq, 0.12, 'triangle', 0.3);
      }, idx * 45);
    });
  }

  public playRallyMilestone(level: number): void {
    if (!this.sfxEnabled) return;
    const baseFreq = level >= 20 ? 880 : level >= 15 ? 740 : level >= 10 ? 660 : 580;
    this.playSynthBlip(baseFreq, 0.18, 'sine', 0.35);
    setTimeout(() => this.playSynthBlip(baseFreq * 1.33, 0.25, 'triangle', 0.4), 80);
    if (level >= 15) {
      setTimeout(() => this.playSynthBlip(baseFreq * 1.5, 0.3, 'square', 0.25), 160);
    }
  }

  public playWinFanfare(): void {
    if (!this.sfxEnabled) return;
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playSynthBlip(freq, 0.25, 'triangle', 0.35);
      }, idx * 120);
    });
  }

  public playMusic(track: 'menu' | 'game'): void {
    this.currentTrack = track;
    if (!this.musicEnabled) return;
    this.stopMusic();

    let step = 0;
    const bassNotesMenu = [110, 110, 130.8, 146.8]; // A2, C3, D3
    const bassNotesGame = [110, 110, 146.8, 164.8, 130.8, 110, 164.8, 196]; // A2, D3, E3, C3, E3, G3
    const intervalMs = track === 'menu' ? 420 : 260;
    const notes = track === 'menu' ? bassNotesMenu : bassNotesGame;

    this.musicTimer = window.setInterval(() => {
      if (!this.musicEnabled || !this.audioContext || this.audioContext.state !== 'running') return;
      const freq = notes[step % notes.length];
      const isLead = step % 4 === 2;
      this.playSynthBass(freq, (intervalMs / 1000) * 0.75, 0.12);
      if (isLead && track === 'game') {
        this.playSynthLead(freq * 3, 0.15, 0.06);
      }
      step++;
    }, intervalMs);
  }

  public stopMusic(): void {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = undefined;
    }
  }

  private playSynthBlip(freq: number, dur: number, type: OscillatorType = 'sine', vol: number = 0.3): void {
    if (!this.audioContext) return;
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
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
  }

  private playSynthBass(freq: number, dur: number, vol: number): void {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
    gain.gain.setValueAtTime(vol, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + dur);
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start();
    osc.stop(this.audioContext.currentTime + dur);
  }

  private playSynthLead(freq: number, dur: number, vol: number): void {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
    gain.gain.setValueAtTime(vol, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + dur);
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start();
    osc.stop(this.audioContext.currentTime + dur);
  }

  private playSynthExplosion(): void {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.audioContext.currentTime + 0.35);
    gain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.35);
  }
}
