import { chromium } from '../tools/media-capture/node_modules/playwright-core/index.mjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const artifactDir = 'C:/Users/Reza/.gemini/antigravity/brain/01200c1e-16c9-4164-9e4b-e1b6e9c1cd7a';

const BASE = 'http://localhost:4173/block-breaker/';

console.log('Testing Block Breaker at:', BASE);

const consoleErrors = [];

const browser = await chromium.launch({
  channel: 'msedge',
  headless: true,
  args: ['--mute-audio', '--no-sandbox'],
});

const context = await browser.newContext({
  viewport: { width: 1024, height: 768 },
  deviceScaleFactor: 1,
});

const page = await context.newPage();

page.on('console', (msg) => {
  if (msg.type() === 'error') {
    console.error('Browser Error:', msg.text());
    consoleErrors.push(msg.text());
  } else {
    console.log(`[Browser ${msg.type()}]`, msg.text());
  }
});

page.on('pageerror', (err) => {
  console.error('Page Error:', err.message);
  consoleErrors.push(err.message);
});

try {
  console.log('Loading page...');
  await page.goto(BASE, { waitUntil: 'networkidle' });

  // 1. Wait for Phaser game to boot and reach MenuScene
  console.log('Waiting for MenuScene...');
  await page.waitForFunction(() => {
    const g = window.game || window.__game;
    return g && g.isBooted && g.scene && g.scene.isActive('MenuScene');
  }, { timeout: 10000 });

  await page.waitForTimeout(1000); // let animations settle

  // Take screenshot of MenuScene
  const menuShotPath = path.join(artifactDir, 'block_breaker_menu.png');
  await page.screenshot({ path: menuShotPath });
  console.log('MenuScene screenshot saved to:', menuShotPath);

  // 2. Open Tactical Briefing (How to Play)
  console.log('Testing HOW TO PLAY modal...');
  await page.keyboard.press('KeyH');
  await page.waitForTimeout(600);
  const helpShotPath = path.join(artifactDir, 'block_breaker_help_modal.png');
  await page.screenshot({ path: helpShotPath });
  console.log('Help modal screenshot saved to:', helpShotPath);

  // Close modal by clicking Close button or pressing space/esc
  await page.evaluate(() => {
    const g = window.game || window.__game;
    const menu = g.scene.getScene('MenuScene');
    if (menu && menu.helpModal) menu.helpModal.hide();
  });
  await page.waitForTimeout(400);

  // 3. Start Mission
  console.log('Starting mission into GameScene...');
  await page.keyboard.press('Space');

  // Wait for GameScene to be active
  await page.waitForFunction(() => {
    const g = window.game || window.__game;
    return g && g.scene && g.scene.isActive('GameScene');
  }, { timeout: 10000 });

  console.log('GameScene active! Waiting for ready state...');
  await page.waitForTimeout(1200);

  // Take screenshot of Stage 1 ready state
  const stage1ReadyPath = path.join(artifactDir, 'block_breaker_stage1_ready.png');
  await page.screenshot({ path: stage1ReadyPath });
  console.log('Stage 1 Ready screenshot saved to:', stage1ReadyPath);

  // 4. Launch Ball and play bot
  console.log('Launching ball and simulating bot play...');
  await page.keyboard.press('Space');
  await page.waitForTimeout(300);

  // Run a simple tracking loop for 4 seconds
  const startTime = Date.now();
  while (Date.now() - startTime < 4500) {
    await page.evaluate(() => {
      const g = window.game || window.__game;
      const gameScene = g.scene.getScene('GameScene');
      if (gameScene && gameScene.paddle && gameScene.balls && gameScene.balls.length > 0) {
        const ball = gameScene.balls[0];
        // Move paddle towards ball X with slight tracking
        gameScene.paddle.setPositionX(ball.x);
      }
    });
    await page.waitForTimeout(40);
  }

  // Take screenshot of active gameplay action
  const actionShotPath = path.join(artifactDir, 'block_breaker_gameplay_action.png');
  await page.screenshot({ path: actionShotPath });
  console.log('Gameplay action screenshot saved to:', actionShotPath);

  // 5. Test Pause Modal
  console.log('Testing Pause Modal...');
  await page.keyboard.press('KeyP');
  await page.waitForTimeout(600);
  const pauseShotPath = path.join(artifactDir, 'block_breaker_pause_modal.png');
  await page.screenshot({ path: pauseShotPath });
  console.log('Pause modal screenshot saved to:', pauseShotPath);

  // Resume game
  await page.keyboard.press('KeyP');
  await page.waitForTimeout(400);

  console.log('Test completed successfully!');
  console.log('Total console errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors encountered:', consoleErrors);
    process.exit(1);
  } else {
    console.log('ALL VERIFICATIONS PASSED WITH 0 ERRORS!');
  }
} catch (err) {
  console.error('Test execution failed:', err);
  process.exit(1);
} finally {
  await browser.close();
}
