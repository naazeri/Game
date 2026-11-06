import Phaser from 'phaser';

export const TEXT_RESOLUTION = 2.5;

export function createCrispText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  style: Phaser.Types.GameObjects.Text.TextStyle
): Phaser.GameObjects.Text {
  return scene.add.text(x, y, text, {
    fontFamily: 'Xolonium, sans-serif',
    resolution: TEXT_RESOLUTION,
    ...style,
  });
}
