const puppeteer = require('puppeteer-core');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Reza\\.gemini\\antigravity\\brain\\01200c1e-16c9-4164-9e4b-e1b6e9c1cd7a';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  console.log('Launching browser for v1.2.0 tests...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1280, height: 720 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));

  console.log('Capturing Menu Scene (v1.2.0)...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_menu.png') });

  // Click start button (which is around center)
  const canvas = await page.$('canvas');
  const box = await canvas.boundingBox();
  console.log('Canvas box (100% responsive):', box);

  const startX = box.x + box.width * 0.5;
  const startY = box.y + box.height * 0.52;
  await page.mouse.click(startX, startY);
  await new Promise(r => setTimeout(r, 800));

  console.log('Capturing Game Scene initial...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_gameplay.png') });

  // Rapidly hit coins to test combo & particles!
  for (let i = 0; i < 4; i++) {
    const coinPos = await page.evaluate(() => {
      const game = window.game;
      if (!game) return null;
      const scene = game.scene.getScene('GameScene');
      if (!scene || !scene.coin) return null;
      return { x: scene.coin.x, y: scene.coin.y };
    });

    if (coinPos) {
      console.log(`Hit coin #${i + 1} at (${coinPos.x}, ${coinPos.y})`);
      await page.mouse.click(box.x + coinPos.x, box.y + coinPos.y);
      await new Promise(r => setTimeout(r, 300));
    }
  }

  // Click background once to test miss & micro-shake
  console.log('Testing background miss...');
  await page.mouse.click(box.x + 50, box.y + 400);
  await new Promise(r => setTimeout(r, 400));

  console.log('Capturing Scored/Combo Game Scene...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_scored.png') });

  // Finish game by triggering endGame() to capture Result Scene with combo
  console.log('Triggering Result Scene...');
  await page.evaluate(() => {
    const game = window.game;
    const scene = game.scene.getScene('GameScene');
    if (scene) scene.endGame();
  });
  await new Promise(r => setTimeout(r, 800));

  console.log('Capturing Result Scene...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_result.png') });

  // Test audio count in Result Scene
  const resultAudioStatus = await page.evaluate(() => {
    const game = window.game;
    const menuSounds = game.sound.getAll('bgm_menu');
    const playingSounds = menuSounds.filter((s) => s.isPlaying);
    return {
      totalMenuSounds: menuSounds.length,
      playingCount: playingSounds.length,
      isLooping: menuSounds[0] ? menuSounds[0].loop : false,
    };
  });
  console.log('ResultScene audio status:', resultAudioStatus);

  // Click Back to Menu from Result Scene
  console.log('Navigating Back to Menu from ResultScene...');
  await page.evaluate(() => {
    const game = window.game;
    const scene = game.scene.getScene('ResultScene');
    if (scene) scene.scene.start('MenuScene');
  });
  await new Promise((r) => setTimeout(r, 600));

  // Check audio status in MenuScene after returning from ResultScene
  const menuAfterResultAudioStatus = await page.evaluate(() => {
    const game = window.game;
    const menuSounds = game.sound.getAll('bgm_menu');
    const playingSounds = menuSounds.filter((s) => s.isPlaying);
    return {
      totalMenuSounds: menuSounds.length,
      playingCount: playingSounds.length,
      isLooping: menuSounds[0] ? menuSounds[0].loop : false,
    };
  });
  console.log('MenuScene (after back from Result) audio status:', menuAfterResultAudioStatus);

  if (menuAfterResultAudioStatus.playingCount > 1) {
    throw new Error(`Audio overlap detected! ${menuAfterResultAudioStatus.playingCount} instances playing concurrently.`);
  }

  // Navigate to About Scene
  console.log('Capturing About Scene...');
  await page.evaluate(() => {
    const game = window.game;
    game.scene.stop('ResultScene');
    game.scene.start('AboutScene');
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_about.png') });

  await browser.close();
  console.log('All v1.2.0 verification tests completed successfully!');
})().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
