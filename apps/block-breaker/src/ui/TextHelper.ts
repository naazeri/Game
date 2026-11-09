import Phaser from 'phaser';
import { FONTS } from '../config.js';

export function createCrispText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  style: Phaser.Types.GameObjects.Text.TextStyle
): Phaser.GameObjects.Text {
  const defaultStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: FONTS.RETRO,
    fontSize: '14px',
    color: '#ffffff',
    resolution: 2, // Hi-DPI crispness
  };

  const finalStyle = { ...defaultStyle, ...style };
  return scene.add.text(x, y, text, finalStyle);
}
