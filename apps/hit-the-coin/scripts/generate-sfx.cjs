const fs = require('fs');
const path = require('path');

function createWavHeader(dataLength, sampleRate = 44100, numChannels = 1, bitsPerSample = 16) {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const buffer = Buffer.alloc(44);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataLength, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataLength, 40);

  return buffer;
}

const sampleRate = 44100;

// 1. UI Hover: Gentle cute 8-bit blip (0.04s)
function generateHover() {
  const duration = 0.04;
  const totalSamples = Math.floor(sampleRate * duration);
  const data = Buffer.alloc(totalSamples * 2);

  let phase = 0;
  for (let i = 0; i < totalSamples; i++) {
    const t = i / totalSamples;
    const freq = 900 + 500 * t;
    phase += (2 * Math.PI * freq) / sampleRate;
    const wave = Math.sin(phase) >= 0 ? 0.35 : -0.35;
    const env = 1 - t;
    const sample = Math.floor(wave * env * 32767);
    data.writeInt16LE(Math.max(-32768, Math.min(32767, sample)), i * 2);
  }

  return Buffer.concat([createWavHeader(data.length, sampleRate), data]);
}

// 2. UI Click: Satisfying 8-bit select chime (0.08s)
function generateClick() {
  const duration = 0.08;
  const totalSamples = Math.floor(sampleRate * duration);
  const data = Buffer.alloc(totalSamples * 2);

  let phase = 0;
  const half = Math.floor(totalSamples / 2);
  for (let i = 0; i < totalSamples; i++) {
    const freq = i < half ? 659.25 : 987.77;
    phase += (2 * Math.PI * freq) / sampleRate;
    const wave = Math.sin(phase) >= 0 ? 0.45 : -0.45;
    const localT = (i % half) / half;
    const env = 1 - localT * 0.8;
    const sample = Math.floor(wave * env * 32767);
    data.writeInt16LE(Math.max(-32768, Math.min(32767, sample)), i * 2);
  }

  return Buffer.concat([createWavHeader(data.length, sampleRate), data]);
}

// 3. Urgent Tense 8-bit Warning Alarm / Bomb Tick (0.065s)
// Penetrating high-frequency dual-tone digital alarm ping (Sonic / WarioWare emergency style)
function generateUrgentTick() {
  const duration = 0.065;
  const totalSamples = Math.floor(sampleRate * duration);
  const data = Buffer.alloc(totalSamples * 2);

  let phase = 0;
  for (let i = 0; i < totalSamples; i++) {
    const t = i / totalSamples;
    // High alert frequency: 1900Hz dropping sharply to 1200Hz with digital square bite
    const freq = 1950 - 650 * Math.pow(t, 0.7);
    phase += (2 * Math.PI * freq) / sampleRate;

    // Pulse-width modulated square wave for classic Sega/arcade alarm timbre
    const duty = 0.3;
    const wave = (phase % (2 * Math.PI)) < (2 * Math.PI * duty) ? 0.75 : -0.75;
    
    // Very punchy initial transient + fast exponential decay
    const env = Math.exp(-t * 14);
    const sample = Math.floor(wave * env * 32767);
    data.writeInt16LE(Math.max(-32768, Math.min(32767, sample)), i * 2);
  }

  return Buffer.concat([createWavHeader(data.length, sampleRate), data]);
}

const outDir = path.join(__dirname, '..', 'public', 'assets', 'sounds');
fs.writeFileSync(path.join(outDir, 'ui_hover.wav'), generateHover());
fs.writeFileSync(path.join(outDir, 'ui_click.wav'), generateClick());
fs.writeFileSync(path.join(outDir, 'tick.wav'), generateUrgentTick());

console.log('Successfully generated updated urgent tick.wav and UI SFX');
