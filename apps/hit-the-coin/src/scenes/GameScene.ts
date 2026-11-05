import Phaser from 'phaser';
import { GAME_CONFIG } from '../config';

export class GameScene extends Phaser.Scene {
  private score = 0;
  private timeLeft = GAME_CONFIG.TIMEOUT_SECONDS;
  private comboCount = 0;
  private maxCombo = 0;
  private lastHitTime = 0;
  private isSpecialCoin = false;
  private isGameOver = false;

  private background!: Phaser.GameObjects.Rectangle;
  private scoreText!: Phaser.GameObjects.Text;
  private timeText!: Phaser.GameObjects.Text;
  private bestText!: Phaser.GameObjects.Text;
  private comboHudText!: Phaser.GameObjects.Text;
  private coin!: Phaser.GameObjects.Sprite;
  private timerEvent?: Phaser.Time.TimerEvent;
  private panicTickEvents: Phaser.Time.TimerEvent[] = [];

  constructor() {
    super('GameScene');
  }

  init(): void {
    this.score = 0;
    this.timeLeft = GAME_CONFIG.TIMEOUT_SECONDS;
    this.comboCount = 0;
    this.maxCombo = 0;
    this.lastHitTime = 0;
    this.isSpecialCoin = false;
    this.isGameOver = false;
    this.clearPanicTicks();
  }

  create(): void {
    const { width, height } = this.scale;

    // Start fast-paced gameplay music
    this.sound.stopAll();
    this.sound.play('bgm_game', { loop: true, volume: 0.35 });

    // 1. Interactive background: detects missed clicks
    this.background = this.add.rectangle(0, 0, width, height, GAME_CONFIG.BG_COLOR_HEX)
      .setOrigin(0)
      .setInteractive();

    this.background.on('pointerdown', () => {
      if (this.isGameOver) return;
      this.handleMiss();
    });

    // 2. HUD - Score & Time & Best
    const hudFontSize = `${Math.min(52, Math.max(34, Math.round(width * 0.04)))}px`;

    this.scoreText = this.add.text(35, 25, 'Score: 0', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: hudFontSize,
      color: '#000000',
    });

    this.timeText = this.add.text(width / 2, 25, `Time: ${this.timeLeft}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: hudFontSize,
      color: '#000000',
    }).setOrigin(0.5, 0);

    const savedHighScore = localStorage.getItem(GAME_CONFIG.STORAGE_KEY_HIGHSCORE) || '0';
    this.bestText = this.add.text(width - 35, 25, `Best: ${savedHighScore}`, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: `${Math.min(38, Math.max(26, Math.round(width * 0.03)))}px`,
      color: '#555555',
    }).setOrigin(1, 0);

    // Active combo indicator on HUD
    this.comboHudText = this.add.text(35, 80, '', {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '32px',
      color: '#ea580c',
    });

    // 3. The Spinning Coin
    this.coin = this.add.sprite(width / 2, height / 2, 'coin_1')
      .setDisplaySize(GAME_CONFIG.COIN_DISPLAY_SIZE, GAME_CONFIG.COIN_DISPLAY_SIZE)
      .setInteractive({ useHandCursor: true });

    this.coin.play('coin_spin');

    // On coin hit
    this.coin.on('pointerdown', (_pointer: unknown, _x: unknown, _y: unknown, event: Phaser.Types.Input.EventData) => {
      if (this.isGameOver) return;
      event.stopPropagation();
      this.handleCoinHit();
    });

    // Initial coin positioning
    this.repositionCoin();

    // 4. Timer Countdown (every 1 second)
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.isGameOver) return;

        this.timeLeft--;
        this.timeText.setText(`Time: ${this.timeLeft}`);

        // Trigger accelerating rapid-fire panic ticks when timer <= 3s
        if (this.timeLeft <= 3 && this.timeLeft > 0) {
          this.triggerUrgentCountdown(this.timeLeft);
        }

        if (this.timeLeft <= 0) {
          this.endGame();
        }
      },
    });

    // 5. Escape key listener
    this.input.keyboard?.on('keydown-ESC', () => {
      this.endGame();
    });

    // 6. Handle responsive resize
    this.scale.on('resize', this.handleResize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.clearPanicTicks();
      this.scale.off('resize', this.handleResize, this);
    });
  }

  private triggerUrgentCountdown(secondsLeft: number): void {
    this.clearPanicTicks();

    // Accelerate rhythm & pitch as time runs out:
    // 3 seconds remaining: 2 ticks (every 500ms), pitch 1.05
    // 2 seconds remaining: 3 rapid ticks (every 330ms), pitch 1.25
    // 1 second remaining:  5 frantic ticks (every 180ms), pitch 1.45
    let tickCount = 2;
    let interval = 500;
    let pitch = 1.05;

    if (secondsLeft === 2) {
      tickCount = 3;
      interval = 330;
      pitch = 1.25;
    } else if (secondsLeft === 1) {
      tickCount = 5;
      interval = 180;
      pitch = 1.45;
    }

    // Duck background music slightly so urgent alert clearly cuts through
    const bgm = this.sound.get('bgm_game') as Phaser.Sound.WebAudioSound | undefined;
    if (bgm && bgm.setVolume) {
      bgm.setVolume(0.18);
    }

    this.timeText.setColor('#dc2626');

    for (let i = 0; i < tickCount; i++) {
      const evt = this.time.delayedCall(i * interval, () => {
        if (this.isGameOver) return;
        this.sound.play('tick_sound', { rate: pitch, volume: 0.9 });

        // Pulse timer text in sync with each fast tick
        this.tweens.add({
          targets: this.timeText,
          scale: 1.28,
          duration: 65,
          yoyo: true,
          ease: 'Quad.easeInOut',
        });
      });
      this.panicTickEvents.push(evt);
    }
  }

  private clearPanicTicks(): void {
    this.panicTickEvents.forEach((evt) => evt.destroy());
    this.panicTickEvents = [];
  }

  private handleCoinHit(): void {
    const now = this.time.now;
    const isSpecial = this.isSpecialCoin;

    // 1. Combo calculation
    if (this.lastHitTime > 0 && now - this.lastHitTime <= GAME_CONFIG.COMBO_TIMEOUT_MS) {
      this.comboCount++;
    } else {
      this.comboCount = 1;
    }
    this.lastHitTime = now;

    if (this.comboCount > this.maxCombo) {
      this.maxCombo = this.comboCount;
    }

    // 2. Score calculation
    let points = isSpecial ? 2 : 1;
    if (this.comboCount >= 3) {
      points += 1; // Combo bonus point
    }
    this.score += points;
    this.scoreText.setText(`Score: ${this.score}`);

    // If special coin, add +1 second bonus time!
    if (isSpecial) {
      this.timeLeft += 1;
      this.timeText.setText(`Time: ${this.timeLeft}`);

      // If gained time above 3s, relieve panic mode
      if (this.timeLeft > 3) {
        this.clearPanicTicks();
        const bgm = this.sound.get('bgm_game') as Phaser.Sound.WebAudioSound | undefined;
        if (bgm && bgm.setVolume) {
          bgm.setVolume(0.35);
        }
        this.timeText.setColor('#16a34a');
        this.tweens.add({
          targets: this.timeText,
          scale: 1.18,
          duration: 120,
          yoyo: true,
          onComplete: () => {
            if (this.timeLeft > 3) this.timeText.setColor('#000000');
          },
        });
      }
    }

    // 3. Audio & Particle Burst
    this.sound.play('coin_sound', { volume: 0.9 });
    this.spawnParticleBurst(this.coin.x, this.coin.y, isSpecial);

    // 4. Floating Feedback Text
    let feedbackStr = isSpecial ? `+2 (+1s!)` : `+${points}`;
    if (this.comboCount >= 2) {
      feedbackStr += `  x${this.comboCount} COMBO!`;
      this.comboHudText.setText(`Combo: x${this.comboCount}`);
    } else {
      this.comboHudText.setText('');
    }
    this.showFloatingText(this.coin.x, this.coin.y - 20, feedbackStr, isSpecial ? '#0284c7' : '#ea580c');

    // 5. Coin squeeze tween
    this.tweens.add({
      targets: this.coin,
      scaleX: (GAME_CONFIG.COIN_DISPLAY_SIZE / 16) * 1.3,
      scaleY: (GAME_CONFIG.COIN_DISPLAY_SIZE / 16) * 0.8,
      duration: 80,
      yoyo: true,
      ease: 'Quad.easeInOut',
      onComplete: () => {
        this.coin.setDisplaySize(GAME_CONFIG.COIN_DISPLAY_SIZE, GAME_CONFIG.COIN_DISPLAY_SIZE);
      },
    });

    // 6. Respawn coin
    this.repositionCoin();
  }

  private handleMiss(): void {
    // Break combo
    this.comboCount = 0;
    this.comboHudText.setText('');

    // Micro screen shake (120ms, 0.005 intensity)
    this.cameras.main.shake(120, 0.005);
    this.sound.play('fail_sound', { volume: 0.8 });
  }

  private spawnParticleBurst(x: number, y: number, isSpecial: boolean): void {
    const tints = isSpecial
      ? [0x38bdf8, 0x0284c7, 0xffffff, 0x93c5fd]
      : [0xffd700, 0xfacc15, 0xf59e0b, 0xffffff];

    for (let i = 0; i < 12; i++) {
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const speed = Phaser.Math.Between(120, 280);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const tint = tints[Phaser.Math.Between(0, tints.length - 1)];

      const p = this.add.image(x, y, 'pixel')
        .setDisplaySize(12, 12)
        .setTint(tint);

      this.tweens.add({
        targets: p,
        x: x + vx * 0.35,
        y: y + vy * 0.35,
        scale: 0,
        alpha: 0,
        duration: Phaser.Math.Between(300, 480),
        ease: 'Cubic.easeOut',
        onComplete: () => {
          p.destroy();
        },
      });
    }
  }

  private showFloatingText(x: number, y: number, text: string, color: string): void {
    const floatText = this.add.text(x, y, text, {
      fontFamily: GAME_CONFIG.FONT_FAMILY,
      fontSize: '40px',
      color,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: floatText,
      y: y - 75,
      alpha: 0,
      scale: 1.15,
      duration: 650,
      ease: 'Power2',
      onComplete: () => {
        floatText.destroy();
      },
    });
  }

  private repositionCoin(): void {
    const { width, height } = this.scale;
    const halfSize = GAME_CONFIG.COIN_DISPLAY_SIZE / 2;

    const minX = GAME_CONFIG.MARGIN + halfSize;
    const maxX = Math.max(minX + 50, width - GAME_CONFIG.MARGIN - halfSize);
    const minY = GAME_CONFIG.TOP_MARGIN + halfSize;
    const maxY = Math.max(minY + 50, height - GAME_CONFIG.MARGIN - halfSize);

    const newX = Phaser.Math.Between(minX, maxX);
    const newY = Phaser.Math.Between(minY, maxY);

    this.coin.setPosition(newX, newY);

    // Roll for special coin (15% chance)
    this.isSpecialCoin = Math.random() < GAME_CONFIG.SPECIAL_COIN_CHANCE;
    if (this.isSpecialCoin) {
      this.coin.setTint(0x38bdf8);
    } else {
      this.coin.clearTint();
    }
  }

  private handleResize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    this.background.setSize(width, height);
    this.timeText.setPosition(width / 2, 25);
    this.bestText.setPosition(width - 35, 25);
    this.repositionCoin();
  }

  private endGame(): void {
    if (this.isGameOver) return;
    this.isGameOver = true;

    if (this.timerEvent) {
      this.timerEvent.destroy();
    }
    this.clearPanicTicks();

    // Stop gameplay music
    this.sound.stopByKey('bgm_game');

    const savedHighScore = parseInt(localStorage.getItem(GAME_CONFIG.STORAGE_KEY_HIGHSCORE) || '0', 10);
    const isNewHighScore = this.score > savedHighScore;

    if (isNewHighScore) {
      localStorage.setItem(GAME_CONFIG.STORAGE_KEY_HIGHSCORE, this.score.toString());
    }

    this.scene.start('ResultScene', {
      score: this.score,
      highScore: isNewHighScore ? this.score : savedHighScore,
      isNewHighScore,
      maxCombo: this.maxCombo,
    });
  }
}
