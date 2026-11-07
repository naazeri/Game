import Phaser from 'phaser';

export function createCrispText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  style: Phaser.Types.GameObjects.Text.TextStyle = {}
): Phaser.GameObjects.Text {
  const mergedStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: 'VCR_OSD_MONO',
    fontSize: '20px',
    color: '#e0f7fc',
    align: 'center',
    resolution: Math.max(2, window.devicePixelRatio || 2),
    ...style,
  };

  const textObj = scene.add.text(x, y, text, mergedStyle);
  return textObj;
}

export function createRetroScoreText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  style: Phaser.Types.GameObjects.Text.TextStyle = {}
): Phaser.GameObjects.Text {
  const mergedStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: 'VCR_OSD_MONO',
    fontSize: '110px',
    color: '#243754',
    align: 'center',
    resolution: Math.max(2, window.devicePixelRatio || 2),
    ...style,
  };

  const textObj = scene.add.text(x, y, text, mergedStyle);
  return textObj;
}
