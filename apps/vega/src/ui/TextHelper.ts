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
    fontSize: '16px',
    color: '#ffffff',
    resolution: 2,
    ...style,
  };

  return scene.add.text(x, y, text, mergedStyle);
}
