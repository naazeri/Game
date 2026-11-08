// "Pro player" bot for Vega (360° orbital shooter): a stationary core in the middle of a 960x600 field,
// the mouse aims, holding the left button auto-fires, Space detonates an EMP bomb, and shooting a crystal
// collects it. Enemies fly towards the core from the screen edges.
//
// Goal: footage that looks like a skilled HUMAN is playing, not an aimbot.
//   * The pointer is a spring-damped "hand": quick flicks between targets, slight overshoot, tiny tremor.
//   * Targets are chosen by threat (time-to-impact vs time-to-kill), with a human reaction delay
//     before switching, and hysteresis so it doesn't jitter between two enemies.
//   * Shots lead moving targets, but with a small aim error (so a few bolts miss, like a real player).
//   * Power-up crystals are shot when it is safe; the railgun is aimed along the line that pierces the most
//     enemies; the EMP bomb is saved for real emergencies / big swarms.
//
// Recording does NOT start at the first click. The bot plays in real time through the early sectors and starts
// the recorder near the end of sector 4, so the clip shows the busy part: the sector change banners, the
// Dreadnought boss, cruisers, splitters, drones, special weapons, crystals and EMP. Screenshots are taken from the
// whole run, picking the busiest frames with *different* weapons / enemy mixes.
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const CORE = { x: 480, y: 300 };
const W = 960;
const H = 600;
const FIRE_INTERVAL = 0.18; // seconds between volleys (matches PLAYER_CONFIG.fireRate)

const BULLET_SPEED = { standard: 520, triple: 580, railgun: 880, homing: 460 };
// Rough expected damage per second against one target (some bolts miss / are split between targets).
const DPS = {
  standard: (2 * 1 * 0.85) / FIRE_INTERVAL,
  triple: (3 * 1 * 0.6) / FIRE_INTERVAL,
  railgun: (1 * 2) / FIRE_INTERVAL,
  homing: (2 * 1.5 * 0.9) / FIRE_INTERVAL,
};

// We record a longer take (RECORD_MS) and afterwards keep only the busiest CLIP_MS of it (see bestWindow()).
const RECORD_MS = Number(process.env.VEGA_RECORD_MS ?? 36000);
const CLIP_MS = Number(process.env.VEGA_CLIP_MS ?? 15000);
// The clip starts once sector >= RECORD_WAVE and the screen is busy (>= 5 enemies or a boss); at the latest
// two sectors later. Later sectors spawn faster and bring cruisers/splitters/drones together.
const RECORD_WAVE = Number(process.env.VEGA_RECORD_WAVE ?? 9);
const FIRE_RANGE = 340; // a pro lets targets come in before opening fire: busier, more dramatic screen
const GIVE_UP_MS = 9 * 60 * 1000;

const STATE_JS = `(() => {
  const g = window.game || window.__game;
  const sc = g && g.scene.getScene('GameScene');
  if (!sc || !sc.scene.isActive() || !sc.player) return null;
  const p = sc.player;
  const counts = {};
  for (const b of sc.projectiles) if (b.active) counts[b.type] = (counts[b.type] || 0) + 1;
  return {
    over: !!sc.isGameOver, paused: !!sc.isPaused,
    wave: sc.wave, inWave: !!sc.isWaveInProgress, spawned: sc.enemiesSpawnedThisWave, toSpawn: sc.enemiesToSpawnThisWave,
    score: sc.score, combo: sc.combo,
    shields: p.shields, bombs: p.empBombs, weapon: p.currentWeapon, wtimer: p.weaponTimer,
    chrono: sc.chronoFreezeTimer,
    shake: !!(sc.cameras.main.shakeEffect && sc.cameras.main.shakeEffect.isRunning),
    boss: !!(sc.activeDreadnought && sc.activeDreadnought.active),
    bolts: counts,
    enemies: sc.enemies.filter((e) => e.active).map((e) => ({ x: e.x, y: e.y, vx: e.vx, vy: e.vy, r: e.radius, hp: e.hp, type: e.type })),
    crystals: sc.powerUps.filter((c) => c.active).map((c) => ({ x: c.x, y: c.y, type: c.type })),
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

/** Spring-damped "hand" holding the mouse. Slightly under-damped -> a little overshoot after a flick. */
class Hand {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.nx = 0; // tremor (Ornstein-Uhlenbeck noise)
    this.ny = 0;
  }
  step(dt, tx, ty, omega, zeta = 0.82) {
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
    this.nx += (-this.nx * k) + gauss() * 0.22;
    this.ny += (-this.ny * k) + gauss() * 0.22;
  }
  get px() {
    return clamp(this.x + this.nx, 2, W - 2);
  }
  get py() {
    return clamp(this.y + this.ny, 2, H - 2);
  }
}

/** Where to aim so a bolt fired from the core meets a moving target. */
function intercept(e, speed) {
  const rx = e.x - CORE.x;
  const ry = e.y - CORE.y;
  const a = e.vx * e.vx + e.vy * e.vy - speed * speed;
  const b = 2 * (rx * e.vx + ry * e.vy);
  const c = rx * rx + ry * ry;
  let t = 0;
  if (Math.abs(a) < 1e-6) {
    if (Math.abs(b) > 1e-6) t = -c / b;
  } else {
    const disc = b * b - 4 * a * c;
    if (disc >= 0) {
      const sq = Math.sqrt(disc);
      const t1 = (-b - sq) / (2 * a);
      const t2 = (-b + sq) / (2 * a);
      const cands = [t1, t2].filter((v) => v > 0);
      if (cands.length) t = Math.min(...cands);
    }
  }
  if (!(t > 0) || t > 1.6) t = 0;
  return { x: e.x + e.vx * t, y: e.y + e.vy * t };
}

const visible = (o, m = 0) => o.x > m && o.x < W - m && o.y > m && o.y < H - m;

/** Rank enemies by how soon they must be dealt with. */
function assess(s) {
  const w = s.weapon in BULLET_SPEED ? s.weapon : 'standard';
  const list = s.enemies.map((e) => {
    const dx = e.x - CORE.x;
    const dy = e.y - CORE.y;
    const d = Math.hypot(dx, dy);
    const closing = Math.max(8, -(dx * e.vx + dy * e.vy) / Math.max(d, 1));
    const gap = Math.max(0, d - 18 - e.r);
    const tti = gap / closing;
    const killTime = e.hp / DPS[w] + d / BULLET_SPEED[w] + 0.15;
    return { ...e, d, tti, urgency: tti - killTime, seen: visible(e, -6) };
  });
  list.sort((a, b) => a.urgency - b.urgency);
  return { list, weapon: w };
}

/** Railgun: aim along the line that pierces the most (and most dangerous) enemies. */
function bestRailLine(list) {
  let best = null;
  for (const cand of list) {
    if (!cand.seen || cand.d > 620) continue;
    const ux = (cand.x - CORE.x) / cand.d;
    const uy = (cand.y - CORE.y) / cand.d;
    let score = 0;
    for (const m of list) {
      if (!m.seen) continue;
      const rx = m.x - CORE.x;
      const ry = m.y - CORE.y;
      const along = rx * ux + ry * uy;
      const off = Math.abs(rx * uy - ry * ux);
      if (along > 0 && along < 700 && off < m.r + 6) score += (m.hp >= 3 ? 2 : 1) + (m.urgency < 0.8 ? 2 : 0);
    }
    if (!best || score > best.score) best = { score, e: cand };
  }
  return best && best.e;
}

function interest(s) {
  const onScreen = s.enemies.filter((e) => visible(e, 36));
  const types = new Set(onScreen.map((e) => e.type)).size;
  const bolts = Object.values(s.bolts).reduce((a, b) => a + b, 0);
  return (
    types * 4 +
    Math.min(onScreen.length, 9) +
    Math.min(bolts, 12) * 0.6 +
    (s.boss ? 5 : 0) +
    (s.weapon !== 'standard' ? 2 : 0) +
    Math.min(s.combo, 12) * 0.3 +
    Math.min(s.score / 4000, 3)
  );
}

/**
 * Choose the most exciting contiguous CLIP_MS of the take: many enemies on screen, boss, special weapon,
 * EMP blast, camera shake; empty screens (sector banners, waiting for the next wave) are penalised.
 */
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
      if (p.n === 0) empty++;
    }
    if (!count) continue;
    const score = sum / count - 6 * (empty / count); // average excitement, minus a penalty for dead air
    if (score > best.score) best = { start, score };
  }
  return { startMs: best.start, lengthMs: len, score: best.score };
}

export async function playVega(c) {
  const samples = []; // excitement timeline of the take (ms since recording started)
  let lastEmpAt = -1e9;
  const { page, toClient, geo, startRecording, stopRecording, shotDir, log } = c;
  const hand = new Hand(355, 425); // the pointer is still on the "START MISSION" button
  let mouseDown = false;
  let lastEmp = -1e9;
  let recording = false;
  let recStart = 0;
  let idleAngle = rand(0, Math.PI * 2);

  // target bookkeeping (reaction delay + hysteresis)
  let current = null; // the target we are tracking (a recent copy of the enemy)
  let pending = null;
  let pendingSince = 0;
  let crystalMode = false;

  // screenshot candidates: weapon/boss key -> best frames
  const shots = new Map();
  let shotBusy = false;
  let lastShotAt = 0;
  const clip = { x: geo.left, y: geo.top, width: geo.width, height: geo.height };
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
  const maybeShot = (s, now) => {
    // Not while the camera shakes (the frame would be offset), and only with plenty of the weapon's own bolts visible.
    if (shotBusy || s.over || s.shake || now - lastShotAt < 650 || s.wave < 2) return;
    if ((s.bolts[s.weapon] ?? 0) < 3) return;
    const score = interest(s);
    if (score < 14) return;
    const key = s.weapon; // one best frame per weapon -> the gallery shows different bolts
    const best = (shots.get(key) ?? [])[0];
    if (best && score < best.score + 1.5) return;
    lastShotAt = now;
    const types = [...new Set(s.enemies.filter((e) => visible(e, 36)).map((e) => e.type))].join('+');
    void grab(key, score, `wave ${s.wave} ${s.weapon} ${types}`);
  };

  const t0 = performance.now();
  let last = t0;
  let lastLog = 0;

  for (;;) {
    const tickStart = performance.now();
    if (tickStart - t0 > GIVE_UP_MS) throw new Error(`Vega bot: gave up before recording finished (${recording ? 'recording' : 'never reached sector ' + RECORD_WAVE})`);
    const dt = clamp((tickStart - last) / 1000, 0.003, 0.05);
    last = tickStart;

    const s = await page.evaluate(STATE_JS);
    if (!s || s.paused) {
      await sleep(30);
      continue;
    }
    if (s.over) throw new Error(`Vega bot: core destroyed in sector ${s.wave} (score ${s.score}). Improve the bot and re-run.`);

    if (tickStart - lastLog > 8000) {
      lastLog = tickStart;
      log(`t=${Math.round((tickStart - t0) / 1000)}s sector ${s.wave} score ${s.score} shields ${s.shields} bombs ${s.bombs} weapon ${s.weapon} enemies ${s.enemies.length}${recording ? ' [REC]' : ''}`);
    }

    maybeShot(s, tickStart);

    // ---- decide what to do ----
    const { list, weapon } = assess(s);
    const threats = list.filter((e) => e.seen);

    // ---- recording window ----
    if (!recording && s.wave >= RECORD_WAVE && (threats.length >= 5 || s.boss || s.wave >= RECORD_WAVE + 2)) {
      await startRecording();
      recording = true;
      recStart = performance.now();
      log(`recording started at sector ${s.wave} (${threats.length} enemies on screen)`);
    }
    if (recording && performance.now() - recStart > RECORD_MS) break;
    if (recording) {
      const t = performance.now() - recStart;
      const v = Math.min(threats.length, 8) + (s.boss ? 3 : 0) + (s.weapon !== 'standard' ? 1 : 0) + (s.shake ? 1 : 0) + (t - lastEmpAt < 900 ? 4 : 0);
      samples.push({ t, n: threats.length, v });
    }
    const urgent = threats.filter((e) => e.tti < 0.55);
    const nearCount = threats.filter((e) => e.d < 175).length;

    // EMP: only for real emergencies or a big swarm closing in.
    if (s.bombs > 0 && tickStart - lastEmp > 4500) {
      const emergency = urgent.length >= 2 || (s.shields <= 1 && urgent.length >= 1) || nearCount >= 4 || (threats.length >= 9 && nearCount >= 3);
      // With bombs stockpiled a real player spends one on a swarm (and it makes a great shot).
      const sinceRec = performance.now() - recStart;
      const showcase = recording && s.bombs >= 2 && threats.length >= 4 && sinceRec > 5000 && sinceRec - Math.max(lastEmpAt, 0) > 12000;
      if (emergency || showcase) {
        lastEmp = tickStart;
        if (recording) lastEmpAt = performance.now() - recStart;
        await page.keyboard.press('Space');
        log(`EMP nova (sector ${s.wave}, ${threats.length} enemies, ${nearCount} close)`);
      }
    }

    // Pick a target: the most urgent enemy, unless it's safe enough to grab a crystal.
    let aim = null;
    let wantFire = false;
    const mostUrgent = threats[0];
    const safe = !mostUrgent || mostUrgent.urgency > 0.9;
    const crystal = s.crystals.filter((k) => visible(k, 20)).sort((a, b) => Math.hypot(a.x - CORE.x, a.y - CORE.y) - Math.hypot(b.x - CORE.x, b.y - CORE.y))[0];

    if (crystal && safe) {
      crystalMode = true;
      aim = { x: crystal.x, y: crystal.y };
      wantFire = true;
      current = null;
      pending = null;
    } else {
      crystalMode = false;
      let desired = mostUrgent;
      if (weapon === 'railgun' && threats.length >= 2) desired = bestRailLine(threats) ?? mostUrgent;
      if (desired) {
        // hysteresis: stick with the current target unless the new one is clearly more urgent
        const cur = current ? threats.find((e) => Math.abs(e.x - current.x) < 60 && Math.abs(e.y - current.y) < 60 && e.type === current.type) : null;
        if (cur && desired.urgency > cur.urgency - 0.25 && !(urgent.length && cur.tti > 1.2)) desired = cur;
        if (!cur || desired === cur) {
          current = desired;
          pending = null;
        } else {
          // human reaction time before switching to a new target
          if (!pending || Math.hypot(pending.x - desired.x, pending.y - desired.y) > 80) {
            pending = desired;
            pendingSince = tickStart;
          }
          if (tickStart - pendingSince > rand(90, 170) || cur === null || (urgent.length && desired.tti < 0.35)) {
            current = desired;
            pending = null;
          } else if (cur) {
            current = cur;
          }
        }
        const tracked = threats.find((e) => e.type === current.type && Math.abs(e.x - current.x) < 70 && Math.abs(e.y - current.y) < 70) ?? desired;
        current = tracked;
        const lead = intercept(tracked, BULLET_SPEED[weapon]);
        // small human aim error
        const err = clamp(tracked.d / 100, 1, 5);
        aim = { x: lead.x + gauss() * err, y: lead.y + gauss() * err };
        wantFire = tracked.d < FIRE_RANGE || tracked.urgency < 1.2 || urgent.length > 0;
      }
    }

    if (!aim) {
      // Nothing to shoot: lazily sweep around, ready for the next spawn.
      idleAngle += dt * 0.55;
      aim = { x: CORE.x + Math.cos(idleAngle) * 170, y: CORE.y + Math.sin(idleAngle) * 130 };
      wantFire = false;
    }

    // ---- move the hand ----
    const panic = urgent.length > 0;
    const omega = crystalMode ? 22 : panic ? 34 : 26;
    hand.step(dt, clamp(aim.x, 4, W - 4), clamp(aim.y, 4, H - 4), omega);
    const [cx, cy] = toClient(hand.px, hand.py);
    await page.mouse.move(cx, cy);

    // ---- trigger finger ----
    if (wantFire && !mouseDown) {
      await page.mouse.down();
      mouseDown = true;
    } else if (!wantFire && mouseDown) {
      await page.mouse.up();
      mouseDown = false;
    }

    const spent = performance.now() - tickStart;
    if (spent < 9) await sleep(9 - spent);
  }

  if (mouseDown) await page.mouse.up();
  const takeMs = performance.now() - recStart;
  await stopRecording();
  const win = bestWindow(samples, takeMs);
  log(`take ${(takeMs / 1000).toFixed(1)}s; best ${(win.lengthMs / 1000).toFixed(0)}s window starts at ${(win.startMs / 1000).toFixed(1)}s (excitement ${win.score.toFixed(1)})`);

  // ---- pick the three most varied screenshots ----
  const pool = [...shots.values()].flat().sort((a, b) => b.score - a.score);
  const chosen = [];
  const usedKeys = new Set();
  for (const cand of pool) {
    if (chosen.length < 3 && !usedKeys.has(cand.key)) {
      chosen.push(cand);
      usedKeys.add(cand.key);
    }
  }
  for (const cand of pool) {
    if (chosen.length < 3 && !chosen.includes(cand)) chosen.push(cand);
  }
  if (chosen.length < 3) throw new Error(`Vega bot: only ${chosen.length} screenshot candidates were found`);
  // chronological order feels natural in the gallery
  chosen.sort((a, b) => a.at - b.at);
  chosen.forEach((cand, i) => {
    writeFileSync(path.join(shotDir, `shot-${i + 1}.png`), cand.buf);
    log(`screenshot ${i + 1}: ${cand.meta} (score ${cand.score.toFixed(1)}, key ${cand.key})`);
  });

  // capture.mjs trims the take to this window
  return { clipStartMs: win.startMs, clipLengthMs: win.lengthMs };
}
