import { GameMode } from '../config';

const PREFIX = 'change_balls_';

export class StorageManager {
  private static getKey(key: string): string {
    return PREFIX + key;
  }

  public static getBestScore(mode: GameMode): number {
    const key = mode === 'onePlayer' ? 'bso' : 'bst';
    const val = localStorage.getItem(this.getKey(key));
    return val ? parseInt(val, 10) : 0;
  }

  public static saveBestScore(mode: GameMode, score: number): boolean {
    const current = this.getBestScore(mode);
    if (score > current) {
      const key = mode === 'onePlayer' ? 'bso' : 'bst';
      localStorage.setItem(this.getKey(key), score.toString());
      return true; // new high score
    }
    return false;
  }

  public static getCurrentScore(): number {
    const val = localStorage.getItem(this.getKey('cs'));
    return val ? parseInt(val, 10) : 0;
  }

  public static saveCurrentScore(score: number): void {
    localStorage.setItem(this.getKey('cs'), score.toString());
    this.incrementGamesPlayed();
  }

  public static getGamesPlayed(): number {
    const val = localStorage.getItem(this.getKey('games_played'));
    return val ? parseInt(val, 10) : 0;
  }

  private static incrementGamesPlayed(): void {
    const total = this.getGamesPlayed() + 1;
    localStorage.setItem(this.getKey('games_played'), total.toString());
  }

  public static getSpeedSetting(): number {
    const val = localStorage.getItem(this.getKey('speed'));
    return val ? parseFloat(val) : 10; // 5 to 20, default 10
  }

  public static saveSpeedSetting(val: number): void {
    localStorage.setItem(this.getKey('speed'), val.toString());
  }

  public static isSoundEnabled(): boolean {
    const val = localStorage.getItem(this.getKey('sound_enabled'));
    return val !== 'false'; // default true
  }

  public static setSoundEnabled(enabled: boolean): void {
    localStorage.setItem(this.getKey('sound_enabled'), enabled ? 'true' : 'false');
  }

  public static isMusicEnabled(): boolean {
    const val = localStorage.getItem(this.getKey('music_enabled'));
    return val !== 'false'; // default true
  }

  public static setMusicEnabled(enabled: boolean): void {
    localStorage.setItem(this.getKey('music_enabled'), enabled ? 'true' : 'false');
  }
}
