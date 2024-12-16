import VOID_SEQUENCE_001 from '../../public/assets/void_sequence_001.webp';
import VOID_SEQUENCE_002 from '../../public/assets/void_sequence_002.webp';
import VOID_SEQUENCE_003 from '../../public/assets/void_sequence_003.webp';

export const FEATURE_IMAGES = [VOID_SEQUENCE_001, VOID_SEQUENCE_002, VOID_SEQUENCE_003];

export const FEATURES = [
  {
    title: 'VOID_SEQUENCE_001',
    description: 'Prove your worth in the trials of the Abyss; only the worthy may ascend.',
    imageSrc: VOID_SEQUENCE_001,
  },
  {
    title: 'VOID_SEQUENCE_002',
    description: 'A convergence looms: fragments of the void crystallize into artifacts of potential.',
    imageSrc: VOID_SEQUENCE_002,
  },
  {
    title: 'VOID_SEQUENCE_003',
    description: 'Forge the unthinkable: a living framework to summon worlds from whispers in the dark.',
    imageSrc: VOID_SEQUENCE_003,
  },
] as const;

export const STATS = [
  { value: '⌖', label: 'Cultists' },
  { value: '∞', label: 'Sacrifices' },
  { value: '777', label: 'Artifacts' },
  { value: 'π', label: 'Dimensions' },
] as const;
