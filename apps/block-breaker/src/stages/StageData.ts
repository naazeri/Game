import { BlockType } from '../config.js';

export interface StageInfo {
  id: number;
  name: string;
  subtitle: string;
  accentColor: string;
  grid: string[];
}

export const STAGES: StageInfo[] = [
  {
    id: 1,
    name: 'STAGE 1',
    subtitle: 'NEON GATEWAY',
    accentColor: '#10b981',
    grid: [
      'E E E E E E E E E E',
      'E C C E E E E C C E',
      'C C C C C C C C C C',
      '. E E E E E E E E .',
    ],
  },
  {
    id: 2,
    name: 'STAGE 2',
    subtitle: 'CYBER FORTRESS',
    accentColor: '#06b6d4',
    grid: [
      'M C C C C C C C C M',
      'C M . C B B C . M C',
      'C C M M C C M M C C',
      '. C C B C C B C C .',
      '. . C C C C C C . .',
    ],
  },
  {
    id: 3,
    name: 'STAGE 3',
    subtitle: 'DIAMOND MATRIX',
    accentColor: '#facc15',
    grid: [
      '. . . . T T . . . .',
      '. . . M G G M . . .',
      '. . M C B B C M . .',
      '. T C E E E E C T .',
      '. . M C B B C M . .',
      '. . . M G G M . . .',
    ],
  },
  {
    id: 4,
    name: 'STAGE 4',
    subtitle: 'HAZARD MAZE',
    accentColor: '#ef4444',
    grid: [
      'T M M C C C C M M T',
      '. . T . B . B . T .',
      'C C . T M G M T . C',
      'E E C . B . B . C E',
      '. . T E E E E T . .',
    ],
  },
  {
    id: 5,
    name: 'STAGE 5',
    subtitle: 'THE QUANTUM CORE',
    accentColor: '#d946ef',
    grid: [
      'M M M M T T M M M M',
      'M C C . G G . C C M',
      'T C B M G G M B C T',
      'M C B M G G M B C M',
      'M C C . G G . C C M',
      '. . T M M M M T . .',
    ],
  },
];

export function parseBlockType(char: string): BlockType | null {
  switch (char) {
    case 'E':
      return BlockType.Emerald;
    case 'C':
      return BlockType.Cyan;
    case 'M':
      return BlockType.Magenta;
    case 'G':
      return BlockType.Gold;
    case 'B':
      return BlockType.Bomb;
    case 'T':
      return BlockType.Titanium;
    default:
      return null;
  }
}
