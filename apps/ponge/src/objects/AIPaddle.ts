import Phaser from 'phaser';
import { Paddle } from './Paddle.js';
import { AIDifficulty, AI_BOT_PROFILES, AIBotProfile } from '../config.js';
import { Ball } from './Ball.js';

export class AIPaddle extends Paddle {
  public difficulty: AIDifficulty;
  public profile: AIBotProfile;
  private deadzone: number;
  private reactionDelayTimer: number = 0;
  private cachedDir: number = 0;
  private targetOffset: number = 0;
  private offsetDecidedForBall: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number, color: number, difficulty: AIDifficulty = AIDifficulty.Normal) {
    super(scene, x, y, color);
    this.difficulty = difficulty;
    this.profile = AI_BOT_PROFILES[difficulty] || AI_BOT_PROFILES[AIDifficulty.Normal];
    this.deadzone = this.profile.deadzone;
  }

  public setDifficulty(difficulty: AIDifficulty): void {
    this.difficulty = difficulty;
    this.profile = AI_BOT_PROFILES[difficulty] || AI_BOT_PROFILES[AIDifficulty.Normal];
    this.deadzone = this.profile.deadzone;
  }

  public updateAI(ball: Ball, centerY: number, dt: number): void {
    if (this.isFrozen) {
      this.setDirection(0);
      return;
    }

    this.reactionDelayTimer -= dt;

    if (this.reactionDelayTimer <= 0) {
      // Re-evaluate target direction every few ms to mimic human reflex
      const checkInterval = this.difficulty === AIDifficulty.Pro ? 0.025 : this.difficulty === AIDifficulty.Casual ? 0.12 : 0.06;
      this.reactionDelayTimer = checkInterval;

      if (ball.vx > 0) {
        // Ball approaching AI side
        if (!this.offsetDecidedForBall) {
          this.offsetDecidedForBall = true;
          // Decide if this bot deliberately cuts the corner of its paddle
          if (Math.random() < this.profile.cornerAimRate) {
            // Cut high or cut low
            const cornerCut = (Math.random() > 0.5 ? 1 : -1) * (this.height * 0.36);
            this.targetOffset = cornerCut;
          } else {
            this.targetOffset = (Math.random() - 0.5) * 12; // slight human inaccuracy
          }
        }

        const targetY = ball.y + this.targetOffset;
        const diff = targetY - this.y;

        if (diff > this.deadzone) {
          this.cachedDir = 1; // Down
        } else if (diff < -this.deadzone) {
          this.cachedDir = -1; // Up
        } else {
          this.cachedDir = 0;
        }
      } else {
        // Ball moving away: return to court center smoothly
        this.offsetDecidedForBall = false;
        const centerDiff = centerY - this.y;
        if (centerDiff > 28) {
          this.cachedDir = 1;
        } else if (centerDiff < -28) {
          this.cachedDir = -1;
        } else {
          this.cachedDir = 0;
        }
      }
    }

    this.setDirection(this.cachedDir);
  }
}
