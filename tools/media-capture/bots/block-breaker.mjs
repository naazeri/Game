// "Pro player" bot for Block Breaker (800x600 arena, mouse moves the paddle, Space/click launches the ball and
// fires the lasers). Goal: footage that looks like a skilled HUMAN is playing, not a perfect machine.
//
//   * The pointer is a spring-damped "hand" (slight overshoot, tiny tremor) - the paddle glides, it doesn't teleport.
//   * Where the ball will land is predicted by simulating its flight, bounces off walls AND blocks included. The
//     hand arrives early on long flights but only commits fully when the ball is close.
//   * The paddle is positioned so the ball leaves at the angle that sends it towards a juicy block (bombs and
//     gold vaults first), with a little human aim error - so the rebound is deliberate, not random.
//   * Falling power-ups are fetched whenever there is time to catch them and still be under the ball.
//   * Twin lasers are fired in short bursts; a launch happens after a human pause.
//
// Recording does NOT start at the first click. The bot plays in real time and starts the recorder when it reaches
// stage REC_STAGE (default 3 = "Diamond Matrix": gold vaults and bombs), keeps recording for RECORD_MS and then
// keeps only the busiest CLIP_MS of that take (many balls, buffs, lasers, chain explosions, combos).
// Screenshots come from the whole run: the best frame per (stage, feature), then 3 are picked so that they
// show different stages and different power-ups.
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const W = 800;
const H = 600;
const ARENA = { left: 20, right: 780, top: 56, bottom: 588 };
const PADDLE_Y = 546;
const PADDLE_H = 16;
const BALL_R = 7;
const NEXT_BUTTON = { x: 400, y: 365 }; // "ENGAGE NEXT SECTOR" in the stage-clear card
const POWERUP_SPEED = 135;

const RECORD_MS = Number(process.env.BB_RECORD_MS ?? 70000);
const CLIP_MS = Number(process.env.BB_CLIP_MS ?? 11000);
const REC_STAGE = Number(process.env.BB_REC_STAGE ?? 3); // 1-based stage number at which recording starts
const GIVE_UP_MS = 12 * 60 * 1000;

const STATE_JS = `(() => {
  const g = window.game || window.__game;
  const sc = g && g.scene.getScene('GameScene');
  if (!sc || !sc.scene.isActive() || !sc.paddle) return null;
  const p = sc.paddle;
  return {
    over: !!sc.isGameOver, paused: !!sc.isPaused, transitioning: !!sc.isStageTransitioning,
    stage: sc.currentStageIndex, score: sc.score, lives: sc.lives, combo: sc.comboMultiplier, comboCount: sc.comboCount,
    fireball: sc.fireballTimer, chrono: sc.chronoTimer,
    shake: !!(sc.cameras.main.shakeEffect && sc.cameras.main.shakeEffect.isRunning),
    paddle: { x: p.x, w: p.width, laser: !!p.isLaserActive, expand: !!p.isExpandActive, barrier: !!p.isSafetyFloorActive,
              beams: p.lasers.filter((l) => l.active).length },
    balls: sc.balls.filter((b) => b.active).map((b) => ({ x: b.x, y: b.y, vx: b.vx, vy: b.vy, locked: !!b.isLockedToPaddle, fire: !!b.isFireball, slow: !!b.isSlowed })),
    blocks: sc.blocks.filter((b) => b.active).map((b) => ({ x: b.x, y: b.y, w: b.width, h: b.height, type: b.type, hp: b.hp })),
    ups: sc.powerUps.filter((u) => u.active).map((u) => ({ x: u.x, y: u.y, type: u.type })),
  };
})()`;

// ---------- small helpers ----------
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const rand = (a, b) => a + Math.random() * (b - a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const gauss = () => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

/** Spring-damped "hand" holding the mouse (slightly under-damped -> a little overshoot after a flick). */
class Hand {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.nx = 0; // tremor (Ornstein-Uhlenbeck noise)
    this.ny = 0;
  }
  step(dt, tx, ty, omega, zeta = 0.86) {
    const sub = 0.004;
    let left = dt;
    while (left > 1e-6) {
      const h = Math.min(sub, left);
      const ax = omega * omega * (tx - this.x) - 2 * zeta * omega * this.vx;
      const ay = omega * omega * (ty - this.y) - 2 * zeta * omega * this.vy;
      this.vx += ax * h;
      this.vy += ay * h;
      this.x += this.vx * h;
      this.y += this.vy * h;
      left -= h;
    }
    const k = Math.min(1, dt * 14);
    this.nx += -this.nx * k + gauss() * 0.12;
    this.ny += -this.ny * k + gauss() * 0.12;
  }
  get px() {
    return clamp(this.x + this.nx, 2, W - 2);
  }
  get py() {
    return clamp(this.y + this.ny, 2, H - 2);
  }
}

/**
 * Simulate a ball until it comes back down to the paddle line. Mirrors Ball.update + checkBallBlockCollisions
 * (circle vs AABB, bounce on the axis of least overlap, fireballs pierce). Blocks that die from this hit are
 * removed from the simulation (1-hp blocks, bombs).
 */
function predictLanding(ball, blocks, paddleTop) {
  if (ball.locked) return null;
  let x = ball.x;
  let y = ball.y;
  let vx = ball.vx;
  let vy = ball.vy;
  const k = ball.slow ? 0.65 : 1;
  const live = blocks.map((b) => ({ ...b, dead: false }));
  const dt = 1 / 120;
  for (let step = 0; step < 120 * 7; step++) {
    x += vx * dt * k;
    y += vy * dt * k;
    if (x - BALL_R <= ARENA.left) {
      x = ARENA.left + BALL_R;
      vx = Math.abs(vx);
    } else if (x + BALL_R >= ARENA.right) {
      x = ARENA.right - BALL_R;
      vx = -Math.abs(vx);
    }
    if (y - BALL_R <= ARENA.top) {
      y = ARENA.top + BALL_R;
      vy = Math.abs(vy);
    }
    if (vy > 0 && y + BALL_R >= paddleTop) return { x, t: (step + 1) * dt, vx, vy };
    if (y < 330) {
      for (const b of live) {
        if (b.dead) continue;
        const cx = clamp(x, b.x, b.x + b.w);
        const cy = clamp(y, b.y, b.y + b.h);
        if ((x - cx) ** 2 + (y - cy) ** 2 > BALL_R * BALL_R) continue;
        if (ball.fire) {
          if (b.type !== 'titanium') b.dead = b.hp <= 2;
        } else {
          const oL = Math.abs(x - b.x);
          const oR = Math.abs(x - (b.x + b.w));
          const oT = Math.abs(y - b.y);
          const oB = Math.abs(y - (b.y + b.h));
          const m = Math.min(oL, oR, oT, oB);
          if (m === oL || m === oR) {
            vx = -vx;
            x += vx > 0 ? 2 : -2;
          } else {
            vy = -vy;
            y += vy > 0 ? 2 : -2;
          }
          if (b.type !== 'titanium' && b.hp <= 1) b.dead = true;
        }
        break;
      }
    }
  }
  return null;
}

const BLOCK_VALUE = { gold: 3.2, bomb: 3, magenta: 1.8, cyan: 1.3, emerald: 1, titanium: 0 };

/** Which block do we want the next rebound to head for? */
function pickTarget(s, from) {
  const live = s.blocks.filter((b) => b.type !== 'titanium');
  if (!live.length) return null;
  let best = null;
  for (const b of live) {
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;
    let value = BLOCK_VALUE[b.type] ?? 1;
    if (b.type === 'bomb') value += 0.45 * live.filter((o) => o !== b && Math.hypot(o.x + o.w / 2 - cx, o.y + o.h / 2 - cy) < 95).length;
    const dist = Math.hypot(cx - from.x, cy - 330);
    const score = ((live.length <= 4 ? 1 : value) / (1 + dist / 260)) * rand(0.8, 1.2);
    if (!best || score > best.score) best = { score, b };
  }
  return best.b;
}

/** Paddle x such that a ball landing at `lx` is deflected towards `target` (see Paddle.getDeflectionAngle). */
function aimedPaddleX(lx, halfW, target, noise) {
  if (!target) return lx;
  const dx = target.x + target.w / 2 - lx;
  const dy = PADDLE_Y - (target.y + target.h / 2);
  const deg = (Math.atan2(dx, dy) * 180) / Math.PI; // angle from vertical
  let offset = clamp(deg / 58 + noise, -0.9, 0.9);
  let px = lx - offset * halfW;
  // Near a side wall the paddle can't get far enough out to give that angle (it would loop on the spot):
  // do what a player does and hit the ball the other way, so it kicks off the wall towards the middle.
  if (px < ARENA.left + halfW || px > ARENA.right - halfW) {
    offset = -Math.sign(offset || 1) * 0.75;
    px = lx - offset * halfW;
  }
  return px;
}

function activeBuffs(s) {
  return [s.paddle.laser, s.paddle.expand, s.paddle.barrier, s.fireball > 0, s.chrono > 0].filter(Boolean).length;
}

function featureOf(s) {
  if (s.fireball > 0) return 'fireball';
  if (s.paddle.laser && s.paddle.beams >= 2) return 'laser';
  if (s.balls.length >= 3) return 'multi';
  if (s.chrono > 0) return 'chrono';
  if (s.paddle.barrier) return 'barrier';
  if (s.paddle.expand) return 'expand';
  if (s.combo >= 4) return 'combo';
  return 'plain';
}

function interest(s, recentKills, totalBlocks) {
  const extraBalls = Math.max(0, s.balls.filter((b) => !b.locked).length - 1);
  return (
    extraBalls * 3 +
    activeBuffs(s) * 2.5 +
    Math.min(s.paddle.beams, 6) * 0.7 +
    (s.fireball > 0 ? 3 : 0) +
    Math.min(recentKills, 5) * 1.2 +
    Math.min(s.combo, 5) * 0.8 +
    Math.min(s.ups.length, 2) * 1.2 +
    (s.blocks.length / Math.max(totalBlocks, 1)) * 8
  );
}

/** The most exciting contiguous CLIP_MS of the take; dead air (modals, waiting to launch) is penalised. */
function bestWindow(samples, takeMs) {
  const len = Math.min(CLIP_MS, takeMs);
  let best = { start: 0, score: -Infinity };
  for (let start = 0; start + len <= takeMs + 1; start += 250) {
    let sum = 0;
    let count = 0;
    let empty = 0;
    for (const p of samples) {
      if (p.t < start || p.t >= start + len) continue;
      sum += p.v;
      count++;
      if (!p.live) empty++;
    }
    if (!count) continue;
    const score = sum / count - 8 * (empty / count);
    if (score > best.score) best = { start, score };
  }
  return { startMs: best.start, lengthMs: len, score: best.score };
}

export async function playBlockBreaker(c) {
  const { page, toClient, geo, startRecording, stopRecording, shotDir, log } = c;
  const hand = new Hand(282, 445); // pointer is still on "START MISSION"
  const clip = { x: geo.left, y: geo.top, width: geo.width, height: geo.height };

  let recording = false;
  let recStart = 0;
  const samples = [];
  let finishing = false;

  // screenshot candidates: "stage|feature" -> best frames
  const shots = new Map();
  let shotBusy = false;
  let lastShotAt = 0;
  const grab = async (key, score, meta) => {
    shotBusy = true;
    try {
      const buf = await page.screenshot({ type: 'png', clip });
      const list = shots.get(key) ?? [];
      list.push({ key, score, buf, meta, at: performance.now() });
      list.sort((a, b) => b.score - a.score);
      shots.set(key, list.slice(0, 2));
    } finally {
      shotBusy = false;
    }
  };

  // per-stage bookkeeping
  let stage = -1;
  let totalBlocks = 1;
  let prevBlockCount = 0;
  const killLog = []; // timestamps of recent block kills
  const eventLog = []; // timestamps of recent pick-ups / ball splits
  let lastEvSig = '';
  let lastKillAt = performance.now();
  let lastPred = null;
  let lastScore = -1;
  let lastScoreAt = performance.now();
  let lastStallLog = 0;
  let stageLoadedAt = performance.now();
  let transitionSince = 0;
  let lostBalls = 0;
  let prevLives = 3;

  // aim bookkeeping
  let target = null;
  let noise = 0;
  let prevPrimaryVySign = 0;
  let prevBallCount = 0;
  let lastLaserAt = 0;
  let launchAt = 0;
  let idlePhase = rand(0, 6);
  let clicked = false;

  const t0 = performance.now();
  let last = t0;
  let lastLog = 0;

  // Debug only (to test the bot on a late stage without playing the earlier ones): BB_DEBUG_STAGE=5
  if (process.env.BB_DEBUG_STAGE) {
    const n = Number(process.env.BB_DEBUG_STAGE);
    await sleep(1500);
    await page.evaluate(`(() => { const sc = (window.game || window.__game).scene.getScene('GameScene'); sc.currentStageIndex = ${n - 2}; sc.advanceToNextStage(); })()`);
  }

  for (;;) {
    const tickStart = performance.now();
    if (tickStart - t0 > GIVE_UP_MS) throw new Error('Block Breaker bot: gave up (never finished the recording)');
    const dt = clamp((tickStart - last) / 1000, 0.003, 0.05);
    last = tickStart;

    const s = await page.evaluate(STATE_JS);
    if (!s || s.paused) {
      await sleep(30);
      continue;
    }
    if (s.over) throw new Error(`Block Breaker bot: out of lives in stage ${s.stage + 1} (score ${s.score}). Improve the bot and re-run.`);

    if (s.stage !== stage) {
      stage = s.stage;
      totalBlocks = s.blocks.length;
      prevBlockCount = s.blocks.length;
      stageLoadedAt = tickStart;
      lastKillAt = tickStart;
      lastScoreAt = tickStart;
      target = null;
      launchAt = 0;
      clicked = false;
      transitionSince = 0;
      log(`stage ${stage + 1} loaded (${totalBlocks} blocks)`);
    }
    if (s.lives < prevLives) {
      lostBalls++;
      log(`life lost in stage ${s.stage + 1}: paddle ${Math.round(s.paddle.x)} (w ${Math.round(s.paddle.w)}), last prediction ${JSON.stringify(lastPred)}`);
    }
    prevLives = s.lives;

    // kills for the "recent action" meter
    if (s.blocks.length < prevBlockCount) {
      lastKillAt = tickStart;
      for (let i = 0; i < prevBlockCount - s.blocks.length; i++) killLog.push(tickStart);
    }
    // pick-ups / new balls show a toast; two of them at once overlap into unreadable text
    const evSig = `${activeBuffs(s)}|${s.balls.length}|${s.lives}`;
    if (evSig !== lastEvSig) {
      lastEvSig = evSig;
      eventLog.push(tickStart);
    }
    while (eventLog.length && tickStart - eventLog[0] > 3200) eventLog.shift();
    prevBlockCount = s.blocks.length;
    while (killLog.length && tickStart - killLog[0] > 900) killLog.shift();
    const recentKills = killLog.length;

    if (s.score !== lastScore) {
      lastScore = s.score;
      lastScoreAt = tickStart;
    } else if (tickStart - lastScoreAt > 6000 && tickStart - lastStallLog > 6000) {
      lastStallLog = tickStart;
      log(`no score change for 6s: balls ${JSON.stringify(s.balls.map((b) => ({ x: Math.round(b.x), y: Math.round(b.y), vx: Math.round(b.vx), vy: Math.round(b.vy), locked: b.locked })))} paddle ${Math.round(s.paddle.x)} transitioning ${s.transitioning}`);
    }
    if (tickStart - lastLog > 8000) {
      lastLog = tickStart;
      log(`t=${Math.round((tickStart - t0) / 1000)}s stage ${stage + 1} score ${s.score} lives ${s.lives} balls ${s.balls.length} blocks ${s.blocks.length}/${totalBlocks} buffs ${activeBuffs(s)}${recording ? ' [REC]' : ''}`);
    }

    // ---- recording window ----
    const playingBall = s.balls.some((b) => !b.locked);
    if (!recording && !s.transitioning && s.stage + 1 >= REC_STAGE && playingBall) {
      await startRecording();
      recording = true;
      recStart = performance.now();
      log(`recording started in stage ${stage + 1}`);
    }
    if (recording && performance.now() - recStart > RECORD_MS) break;

    // ---- stage clear: wait for the card, then click "ENGAGE NEXT SECTOR" ----
    if (s.transitioning) {
      if (!transitionSince) transitionSince = tickStart;
      if (recording) samples.push({ t: performance.now() - recStart, v: 0, live: false });
      if (stage === 4) {
        // campaign finished: the victory card, nothing more to play
        await sleep(600);
        break;
      }
      const waited = tickStart - transitionSince;
      hand.step(dt, NEXT_BUTTON.x, NEXT_BUTTON.y, 18);
      const [mx, my] = toClient(hand.px, hand.py);
      await page.mouse.move(mx, my);
      if (waited > 1700 && !clicked && Math.hypot(hand.x - NEXT_BUTTON.x, hand.y - NEXT_BUTTON.y) < 6) {
        await page.mouse.down();
        await sleep(70);
        await page.mouse.up();
        clicked = true;
      }
      await sleep(8);
      continue;
    }
    transitionSince = 0;

    // ---- screenshots: best frame per (stage, feature) ----
    if (!shotBusy && !s.shake && playingBall && tickStart - lastShotAt > 700 && tickStart - stageLoadedAt > 2500 && s.blocks.length > totalBlocks * 0.35) {
      const score = interest(s, recentKills, totalBlocks);
      const feature = featureOf(s);
      // frames right after a pick-up show overlapping toasts ("weak" candidates, used only to fill the gallery)
      const key = `${s.stage + 1}|${feature}${eventLog.length ? '|weak' : ''}`;
      const best = (shots.get(key) ?? [])[0];
      // only genuinely busy moments: several things going on at once, not just a full board
      const busy = Math.max(0, s.balls.length - 1) + activeBuffs(s) + (s.paddle.beams >= 2 ? 1 : 0) + (recentKills >= 2 ? 1 : 0);
      if (busy >= 2 && score >= 13 && (!best || score > best.score + 1.5)) {
        lastShotAt = tickStart;
        void grab(key, score, `stage ${s.stage + 1} ${feature} (balls ${s.balls.length}, blocks ${s.blocks.length})`);
      }
    }

    // ---- recording excitement sample ----
    if (recording) {
      const v =
        Math.max(0, s.balls.length - 1) * 1.5 +
        activeBuffs(s) * 1.5 +
        Math.min(s.paddle.beams, 6) * 0.4 +
        Math.min(recentKills, 6) * 0.9 +
        (s.combo >= 3 ? 1.5 : 0) +
        (s.shake ? 1 : 0) +
        s.ups.length * 0.5 +
        (s.blocks.length / Math.max(totalBlocks, 1)) * 3; // a full board looks better than a nearly empty one
      samples.push({ t: performance.now() - recStart, v, live: playingBall });
    }

    const paddleTop = PADDLE_Y - PADDLE_H / 2;
    const halfW = s.paddle.w / 2;
    let aimX = s.paddle.x;
    let omega = 22;

    if (!playingBall) {
      // ball sits on the paddle: wait a human moment, drift a little, then launch
      if (!launchAt) launchAt = tickStart + rand(650, 1100);
      idlePhase += dt * 1.1;
      aimX = W / 2 + Math.sin(idlePhase) * 120;
      omega = 12;
      if (tickStart >= launchAt) {
        await page.keyboard.press('Space');
        launchAt = 0;
      }
    } else {
      launchAt = 0;
      // ---- predict where each ball lands ----
      const preds = s.balls
        .map((b) => ({ b, p: predictLanding(b, s.blocks, paddleTop) }))
        .filter((e) => e.p)
        .sort((a, b) => a.p.t - b.p.t);
      const primary = preds[0];
      if (primary) lastPred = { lx: Math.round(primary.p.x), t: +primary.p.t.toFixed(2), ball: { x: Math.round(primary.b.x), y: Math.round(primary.b.y), vx: Math.round(primary.b.vx), vy: Math.round(primary.b.vy) } };
      if (primary) {
        const sign = Math.sign(primary.b.vy);
        // a new approach starts after the rebound (ball turns downwards) or when the ball set changes
        if (!target || (prevPrimaryVySign <= 0 && sign > 0) || s.balls.length !== prevBallCount || !s.blocks.some((b) => b.x === target.x && b.y === target.y)) {
          target = pickTarget(s, primary.p);
          // Stuck in a repeating rally (nothing destroyed for a while)? A real player would vary the angle.
          noise = gauss() * (tickStart - lastKillAt > 5000 ? 0.4 : 0.06);
        }
        prevPrimaryVySign = sign;
        const want = aimedPaddleX(primary.p.x, halfW, target, noise);
        aimX = want;
        omega = primary.p.t < 0.3 ? 36 : primary.p.t < 0.7 ? 28 : 18;

        // ---- power-ups: fetch one if we can still be back under the ball in time ----
        const reach = 640;
        for (const u of s.ups.sort((a, b) => b.y - a.y)) {
          const tu = (paddleTop - 9 - u.y) / POWERUP_SPEED;
          if (tu < 0.05) continue;
          const toUp = Math.max(0, Math.abs(u.x - s.paddle.x) - halfW * 0.8) / reach;
          if (toUp > tu - 0.06) continue; // can't get there in time
          if (primary.p.t < tu) continue; // the ball comes first; the power-up will wait its turn
          const back = Math.max(0, Math.abs(u.x - primary.p.x) - halfW * 0.8) / reach;
          if (primary.p.t - tu < back + 0.1) continue; // would miss the ball
          aimX = u.x;
          omega = 30;
          break;
        }
      } else {
        // balls are on their way up: hover under the middle of the action
        const avg = s.balls.reduce((a, b) => a + b.x, 0) / Math.max(1, s.balls.length);
        aimX = avg;
        omega = 14;
      }
      prevBallCount = s.balls.length;

      // ---- lasers in short bursts ----
      if (s.paddle.laser && tickStart - lastLaserAt > rand(210, 260)) {
        lastLaserAt = tickStart;
        await page.keyboard.press('Space');
      }
    }

    // ---- move the hand ----
    hand.step(dt, clamp(aimX, ARENA.left + halfW, ARENA.right - halfW), 500, omega);
    const [mx, my] = toClient(hand.px, hand.py);
    await page.mouse.move(mx, my);

    const spent = performance.now() - tickStart;
    if (spent < 8) await sleep(8 - spent);
  }

  const takeMs = recording ? performance.now() - recStart : 0;
  if (!recording) throw new Error(`Block Breaker bot: never reached stage ${REC_STAGE}, nothing recorded`);
  await stopRecording();
  const win = bestWindow(samples, takeMs);
  log(`take ${(takeMs / 1000).toFixed(1)}s; best ${(win.lengthMs / 1000).toFixed(0)}s window starts at ${(win.startMs / 1000).toFixed(1)}s (excitement ${win.score.toFixed(1)}); balls lost: ${lostBalls}`);

  // ---- pick the three most varied screenshots: different stage AND different power-up where possible ----
  const all = [...shots.values()].flat();
  let pool = all.filter((p) => !p.key.endsWith('|weak'));
  if (pool.length < 5) pool = pool.concat(all.filter((p) => p.key.endsWith('|weak')).map((p) => ({ ...p, score: p.score - 5 })));
  if (pool.length < 3) throw new Error(`Block Breaker bot: only ${pool.length} screenshot candidates were found`);
  const chosen = [];
  while (chosen.length < 3) {
    let best = null;
    for (const cand of pool) {
      if (chosen.includes(cand)) continue;
      const [st, feat] = cand.key.split('|');
      let adj = cand.score;
      for (const ch of chosen) {
        const [cs, cf] = ch.key.split('|');
        if (cs === st) adj -= 8;
        if (cf === feat) adj -= 8;
        if (Math.abs(ch.at - cand.at) < 12000) adj -= 40; // never two frames from the same moment
      }
      if (!best || adj > best.adj) best = { cand, adj };
    }
    chosen.push(best.cand);
  }
  chosen.sort((a, b) => a.at - b.at);
  chosen.forEach((cand, i) => {
    writeFileSync(path.join(shotDir, `shot-${i + 1}.png`), cand.buf);
    log(`screenshot ${i + 1}: ${cand.meta} (score ${cand.score.toFixed(1)}, key ${cand.key})`);
  });

  return { clipStartMs: win.startMs, clipLengthMs: win.lengthMs };
}
