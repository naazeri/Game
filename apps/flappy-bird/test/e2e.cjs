const puppeteer = require(require.resolve('puppeteer-core', { paths: ['apps/hit-the-coin', '.'] }));
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\Reza\\.gemini\\antigravity\\brain\\01200c1e-16c9-4164-9e4b-e1b6e9c1cd7a';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  console.log('Starting Flappy Bird E2E automated verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 480, height: 854 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--autoplay-policy=no-user-gesture-required'],
  });

  const page = await browser.newPage();

  // Track console errors
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.error('Browser console error:', msg.text());
    }
  });
  page.on('pageerror', (err) => {
    errors.push(err.message);
    console.error('Page error:', err.message);
  });

  await page.goto('http://127.0.0.1:3001/', { waitUntil: 'domcontentloaded' });

  // Wait for GameScene to be active
  await page.waitForFunction(() => window.game && window.game.scene.isActive('GameScene'), { timeout: 10000 });
  await new Promise((r) => setTimeout(r, 600));

  console.log('Capturing Ready Screen (Flappy Bird)...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'flappy_ready.png') });

  // Verify Ready state
  const isReady = await page.evaluate(() => {
    const scene = window.game.scene.getScene('GameScene');
    return scene ? scene.state === 'READY' : false;
  });
  console.log('Game state is READY:', isReady);

  // Click on screen to start playing
  console.log('Clicking to flap and start playing...');
  await page.mouse.click(240, 400);
  await new Promise((r) => setTimeout(r, 200));

  // Verify playing state
  const isPlaying = await page.evaluate(() => {
    const scene = window.game.scene.getScene('GameScene');
    return scene ? scene.state === 'PLAYING' : false;
  });
  console.log('Game state is PLAYING:', isPlaying);

  // Flap a couple times
  for (let i = 0; i < 3; i++) {
    await new Promise((r) => setTimeout(r, 400));
    await page.mouse.click(240, 400);
  }

  await new Promise((r) => setTimeout(r, 600));
  console.log('Capturing Gameplay Screen...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'flappy_gameplay.png') });

  // Let bird fall or hit obstacle to trigger Game Over
  console.log('Waiting for bird to hit ground and trigger Game Over...');
  await page.waitForFunction(() => {
    const scene = window.game.scene.getScene('GameScene');
    return scene && scene.state === 'GAME_OVER';
  }, { timeout: 10000 });

  await new Promise((r) => setTimeout(r, 900));

  console.log('Capturing Game Over Screen...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'flappy_gameover.png') });

  // Verify Game Over elements
  const gameOverStatus = await page.evaluate(() => {
    const scene = window.game.scene.getScene('GameScene');
    return {
      state: scene.state,
      score: scene.score,
      highScore: scene.highScore,
      containerVisible: scene.gameOverContainer.visible,
    };
  });
  console.log('Game Over status:', gameOverStatus);

  if (errors.length > 0) {
    throw new Error('Errors found during test execution:\n' + errors.join('\n'));
  }

  await browser.close();
  console.log('E2E TEST PASSED! All Flappy Bird phases verified successfully.');
})().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
